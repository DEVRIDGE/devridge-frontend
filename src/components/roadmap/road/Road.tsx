import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import Tech from "../tech/Tech";
import {
  CSButton,
  CSList,
  CSName,
  Flag,
  OverlayWrapper,
  ProgressBar,
  Rope,
  TechButton,
  Wrapper,
  WrapperItem,
} from "./styles";
import RoadmapTechPage from "../../../pages/roadmapTech/RoadmapTechPage";
import RoadmapCoursePage from "../../../pages/roadmapCourse/RoadmapCoursePage";
import { ICourses, IRoadmap } from "../../../services/types";
import { switchRoadmapDetailState } from "../../../recoil/swtichRoadmapDetail/atom";
import {
  IRoadmapTechDetail,
  roadmapTechState,
} from "../../../recoil/roadmapTechDetail/atom";
import { getRoadmapTechDetail } from "../../../services/apis";
import { jobState } from "../../../recoil/jobId/atom";
import { companyState } from "../../../recoil/companyId/atom";
import { selectedTechIdState } from "../../../recoil/selectedTechId/atom";
import { techTitleState } from "../../../recoil/techTitle/atom";
import { isLoadingTechPageState } from "../../../recoil/isLoadingTechPage/atom";
import Overlay from "../../common/overlay/Overlay";
import { LoaderWrapper } from "../../common/loaderPageWrapper/styles";
import Loader from "../../common/loader/Loader";
import { isLoadingCoursePageState } from "../../../recoil/isLoadingCoursePage/atom";
import Status from "../status/Status";
import { selectedGridIndexState } from "../../../recoil/selectedGridIndex/atom";
import {
  ApiMessage,
  ApiStatus,
  MatchingFlag,
  SwitchDetail,
} from "../../../constants/enums";
import useAdaptiveWidth from "../../../hooks/useAdaptiveWidth";
import { switchLoginState } from "../../../recoil/switchLogin/atom";
import Login from "../../../pages/login/Login";
import { selectedDetailedPositionState } from "../../../recoil/selectedDetailedPosition/atom";
import { accessTokenState } from "../../../recoil/accessToken/atom";
import issueNewAccessTokenHook from "../../../utils/issueNewAccessTokenHook";
import { isLoginState } from "../../../recoil/isLogin/atoms";

interface IRoad {
  roadmapApiData: IRoadmap;
}

interface IOnClickTech {
  selectedTechId: number;
  courseName: string;
  index: number;
  accessToken: string | null;
  recursionCount: number;
}

//NOTE - 플립 280px~359px, 모바일 360px~767px, 태블릿 768px~1023px, 데스크탑 1024px~

function Road({ roadmapApiData }: IRoad) {
  const history = useHistory();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const setSelectedTechTitleState = useSetRecoilState(techTitleState);
  const setSelectedTechState = useSetRecoilState(roadmapTechState);
  const setSelectedTechId = useSetRecoilState(selectedTechIdState); // 로드맵 페이지에서 고른 기술의 아이디
  const setIsLoadingTechPage = useSetRecoilState(isLoadingTechPageState);
  const setSelectedGridIndex = useSetRecoilState(selectedGridIndexState);
  const setIsLogin = useSetRecoilState(isLoginState);

  const jobId = useRecoilValue(jobState);
  const companyId = useRecoilValue(companyState);
  const isLoadingTechPage = useRecoilValue(isLoadingTechPageState);
  const isLoadingCoursePage = useRecoilValue(isLoadingCoursePageState);
  const selectedDetailedPosition = useRecoilValue(
    selectedDetailedPositionState
  );

  //NOTE - 슬라이드 화면 스위칭하는 recoil atom
  const [switchDetail, setSwitchDetail] = useRecoilState(
    switchRoadmapDetailState
  );

  //NOTE - 로그인 스위칭 atom
  const [switchLogin, setSwitchLogin] = useRecoilState(switchLoginState);

  //NOTE - 윈도우 창 가로 크기 state
  const currentWidth = useAdaptiveWidth();

  //NOTE - switch atom 초기화
  useEffect(() => {
    setSwitchDetail(SwitchDetail.BLIND);
    setSwitchLogin(false);
  }, []);

  // NOTE - 그리드 컬럼 수
  const [col, setCol] = useState(9);
  useEffect(() => {
    setCol(
      currentWidth >= 1024
        ? 9
        : currentWidth >= 768
        ? 7
        : currentWidth >= 360
        ? 5
        : 3
    );
  }, [currentWidth]);

  // NOTE - 그리드 레이아웃을 위한 null 값 추가 (window resize -> col 변화 -> 리렌더링)
  const [courseList, rowAll] = useMemo(() => {
    const tmp: [ICourses | null] =
      JSON.parse(JSON.stringify(roadmapApiData.data?.courseList)) || [];
    for (let i = col; i < tmp.length; i += col) {
      tmp.splice(i, 0, null);
    }
    const row_tmp = Math.ceil(tmp.length / col);
    const mustFillCnt = col * row_tmp - tmp.length;
    for (let i = 0; i < mustFillCnt; i++) {
      tmp.splice(tmp.length, 0, null);
    }
    return [tmp, row_tmp];
  }, [col, roadmapApiData.data?.courseList]);

  const onClickTech = async ({
    selectedTechId,
    courseName,
    index: gridIndex,
    accessToken,
    recursionCount,
  }: IOnClickTech) => {
    if (recursionCount > 3) {
      alert("과도한 통신량 발생. 관리자에게 문의해주세요.");
      setIsLogin(false);
      setAccessToken(null);
      localStorage.removeItem("refreshToken");
      history.push("/");
      return;
    }

    setSelectedTechId(selectedTechId);
    setSelectedGridIndex(gridIndex);
    setIsLoadingTechPage(true);
    setSwitchDetail(SwitchDetail.TECH);
    const data: IRoadmapTechDetail = await getRoadmapTechDetail({
      selectedTechId,
      jobId,
      companyId,
      selectedDetailedPosition,
      accessToken,
    });

    if (
      data.status === ApiStatus.error &&
      data.message !== ApiMessage.login_required
    ) {
      if (data.message === ApiMessage.course_detail) {
        alert("관련 강의 및 도서가 존재하지 않습니다.");
        history.push("/");
        return;
      } else {
        const newAccessToken: string | null = await issueNewAccessTokenHook();
        if (newAccessToken === "/") {
          setIsLogin(false);
          setAccessToken(null);
          history.push("/");
          return;
        } else {
          setAccessToken(newAccessToken);
          onClickTech({
            selectedTechId,
            courseName,
            index: gridIndex,
            accessToken: newAccessToken,
            recursionCount: recursionCount + 1,
          });
          return;
        }
      }
    } else {
      setSelectedTechState(data);
      setSelectedTechTitleState(courseName);
      setIsLoadingTechPage(false);
    }
  };

  return (
    <Wrapper $col={col} $row={rowAll}>
      {courseList.map((courseCol, index) => {
        const row = Math.floor(index / col);
        const orderFlipped = col * (row + 2) - (col + 1) - (index % col); // NOTE - 역순 row에 있는 아이템에 order 지정
        return (
          <WrapperItem
            key={index}
            style={{
              order: row % 2 !== 0 ? orderFlipped : index,
            }}
          >
            {/* 맨 처음 progress bar 따로 추가 */}
            {index === 1 ? (
              <ProgressBar $isDone={true} $mediaType="normal" />
            ) : null}

            {Math.floor(index / col) + 1 !== rowAll &&
            index % (col * 2) === col - 1 ? (
              <>
                <ProgressBar $mediaType="rightTop" />
                <ProgressBar $mediaType="rightMid" />
              </>
            ) : null}
            {index % (col * 2) === col ? (
              <ProgressBar $mediaType="rightBot" />
            ) : null}

            {/* 왼쪽 ㄷ자 progress bar */}
            {Math.floor(index / col) + 1 !== rowAll &&
            (index + 1) % (col * 2) === 0 ? (
              <>
                <ProgressBar $mediaType="leftTop" />
                <ProgressBar $mediaType="leftMid" />
              </>
            ) : null}
            {index !== 0 && index % (col * 2) === 0 ? (
              <ProgressBar $mediaType="leftBot" />
            ) : null}

            {courseCol !== null ? (
              <>
                {/* ㄷ자 부분 제외하고 progress bar 렌더링하는 부분 */}
                {courseCol.index % 2 !== 0 &&
                (index + 2) % (col * 2) !== 0 &&
                (index - 1) % (col * 2) !== 0 ? (
                  <ProgressBar
                    $isDone={courseCol.index <= 3}
                    $mediaType="normal"
                  />
                ) : null}

                {/* 서버에서 받은 인덱스가 홀수면 기술과 CS, 짝수면 CS 단독 리스트임 */}
                {courseCol.index % 2 !== 0 ? (
                  <>
                    <TechButton
                      onClick={() =>
                        onClickTech({
                          selectedTechId: courseCol.courses[0].id,
                          courseName: courseCol.courses[0].name,
                          index,
                          accessToken,
                          recursionCount: 0,
                        })
                      }
                    >
                      <Tech
                        techName={courseCol.courses[0].name}
                        $checkerType={
                          courseCol.index <= 2
                            ? 2
                            : courseCol.index === 3
                            ? 1
                            : 0
                        }
                      />
                      {courseCol.courses[0].matchingFlag ===
                      MatchingFlag.YES ? (
                        <Flag
                          width="31"
                          height="49"
                          viewBox="0 0 31 49"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line
                            x1="0.5"
                            y1="2.09082e-08"
                            x2="0.499998"
                            y2="49"
                            stroke="#676767"
                          />
                          <path
                            d="M20.7128 4.18364C17.319 4.18364 14.5161 2.00557 10.2493 2.00557C8.66882 2.00557 7.2531 2.28009 5.93986 2.75781C6.50519 2.56695 5.93986 2.75781 5.02886 2.96728C3.03558 2.96766 5.02886 2.96728 3.29748 2.96766C1.3177 2.96766 3.29748 2.96766 0.600791 2.96766C0.600791 4.15904 0.600329 3.37435 0.600791 4.38164V22.6447C2.04793 22.6447 1.28963 22.6447 2.12909 22.6447H3.38707C4.22653 22.6447 4.65403 22.6447 4.39396 22.6447H4.65403C6.44702 21.8893 8.68079 21.2594 11.9014 21.2594C15.2952 21.2594 18.098 23.4375 22.3649 23.4375C25.4155 23.4375 27.8537 22.4172 30.1234 20.879C30.6733 20.5064 31.0001 19.8876 31.0001 19.2285V4.00593C31.0001 2.54109 29.4631 1.57194 28.1194 2.18898C25.9447 3.18763 23.2775 4.18364 20.7128 4.18364Z"
                            fill="#FF0000"
                          />
                        </Flag>
                      ) : null}
                    </TechButton>
                    {courseCol.courses.slice(1).length !== 0 ? <Rope /> : null}
                    {courseCol.courses.slice(1).length !== 0 ? (
                      <CSList>
                        {courseCol.courses.slice(1).map((cs) => (
                          <CSButton
                            key={cs.id}
                            onClick={() => {
                              onClickTech({
                                selectedTechId: cs.id,
                                courseName: cs.name,
                                index,
                                accessToken,
                                recursionCount: 0,
                              });
                            }}
                          >
                            <Status width="15px" height="15px" />
                            <CSName>{cs.name}</CSName>
                            {cs.matchingFlag === MatchingFlag.YES ? (
                              <Flag
                                width="31"
                                height="49"
                                viewBox="0 0 31 49"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                $isCS={true}
                              >
                                <line
                                  x1="0.5"
                                  y1="2.09082e-08"
                                  x2="0.499998"
                                  y2="49"
                                  stroke="#676767"
                                />
                                <path
                                  d="M20.7128 4.18364C17.319 4.18364 14.5161 2.00557 10.2493 2.00557C8.66882 2.00557 7.2531 2.28009 5.93986 2.75781C6.50519 2.56695 5.93986 2.75781 5.02886 2.96728C3.03558 2.96766 5.02886 2.96728 3.29748 2.96766C1.3177 2.96766 3.29748 2.96766 0.600791 2.96766C0.600791 4.15904 0.600329 3.37435 0.600791 4.38164V22.6447C2.04793 22.6447 1.28963 22.6447 2.12909 22.6447H3.38707C4.22653 22.6447 4.65403 22.6447 4.39396 22.6447H4.65403C6.44702 21.8893 8.68079 21.2594 11.9014 21.2594C15.2952 21.2594 18.098 23.4375 22.3649 23.4375C25.4155 23.4375 27.8537 22.4172 30.1234 20.879C30.6733 20.5064 31.0001 19.8876 31.0001 19.2285V4.00593C31.0001 2.54109 29.4631 1.57194 28.1194 2.18898C25.9447 3.18763 23.2775 4.18364 20.7128 4.18364Z"
                                  fill="#FF0000"
                                />
                              </Flag>
                            ) : null}
                          </CSButton>
                        ))}
                      </CSList>
                    ) : null}
                  </>
                ) : (
                  <>
                    {courseCol.courses.length !== 0 ? (
                      <Rope $marginTop="32px" $height="53px" />
                    ) : null}
                    {courseCol.courses.length !== 0 ? <Rope /> : null}
                    {courseCol.courses.length !== 0 ? (
                      <CSList>
                        {courseCol.courses.map((cs) => (
                          <CSButton
                            key={cs.id}
                            onClick={() => {
                              onClickTech({
                                selectedTechId: cs.id,
                                courseName: cs.name,
                                index,
                                accessToken,
                                recursionCount: 0,
                              });
                            }}
                          >
                            <Status width="15px" height="15px" />
                            <CSName>{cs.name}</CSName>
                            {cs.matchingFlag === MatchingFlag.YES ? (
                              <Flag
                                width="31"
                                height="49"
                                viewBox="0 0 31 49"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                $isCS={true}
                              >
                                <line
                                  x1="0.5"
                                  y1="2.09082e-08"
                                  x2="0.499998"
                                  y2="49"
                                  stroke="#676767"
                                />
                                <path
                                  d="M20.7128 4.18364C17.319 4.18364 14.5161 2.00557 10.2493 2.00557C8.66882 2.00557 7.2531 2.28009 5.93986 2.75781C6.50519 2.56695 5.93986 2.75781 5.02886 2.96728C3.03558 2.96766 5.02886 2.96728 3.29748 2.96766C1.3177 2.96766 3.29748 2.96766 0.600791 2.96766C0.600791 4.15904 0.600329 3.37435 0.600791 4.38164V22.6447C2.04793 22.6447 1.28963 22.6447 2.12909 22.6447H3.38707C4.22653 22.6447 4.65403 22.6447 4.39396 22.6447H4.65403C6.44702 21.8893 8.68079 21.2594 11.9014 21.2594C15.2952 21.2594 18.098 23.4375 22.3649 23.4375C25.4155 23.4375 27.8537 22.4172 30.1234 20.879C30.6733 20.5064 31.0001 19.8876 31.0001 19.2285V4.00593C31.0001 2.54109 29.4631 1.57194 28.1194 2.18898C25.9447 3.18763 23.2775 4.18364 20.7128 4.18364Z"
                                  fill="#FF0000"
                                />
                              </Flag>
                            ) : null}
                          </CSButton>
                        ))}
                      </CSList>
                    ) : null}
                  </>
                )}
              </>
            ) : null}
          </WrapperItem>
        );
      })}
      {switchDetail === SwitchDetail.TECH ? (
        isLoadingTechPage ? (
          <OverlayWrapper>
            <Overlay />
            <LoaderWrapper>
              <Loader width={100} height={100} />
            </LoaderWrapper>
          </OverlayWrapper>
        ) : (
          <RoadmapTechPage />
        )
      ) : null}
      {switchDetail === SwitchDetail.COURSE ? (
        isLoadingCoursePage ? (
          <OverlayWrapper>
            <Overlay />
            <LoaderWrapper>
              <Loader width={100} height={100} />
            </LoaderWrapper>
          </OverlayWrapper>
        ) : (
          <RoadmapCoursePage />
        )
      ) : null}
      {switchLogin ? (
        <Login beforeLoginPath={`/roadmap?job=${jobId}&company=${companyId}`} />
      ) : null}
    </Wrapper>
  );
}

export default Road;
