import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useMemo, useState } from "react";

import Tech from "../tech/Tech";
import {
  CSButton,
  CSList,
  CSName,
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
import { SwitchDetail } from "../../../constants/enums";
import useAdaptiveWidth from "../../../hooks/useAdaptiveWtdth";
import { switchLoginState } from "../../../recoil/switchLogin/atom";
import Login from "../../../pages/login/Login";
import { selectedDetailedPositionState } from "../../../recoil/selectedDetailedPosition/atom";

interface IRoad {
  roadmapApiData: IRoadmap;
}

interface IOnClickTech {
  selectedTechId: number;
  index: number;
}

//NOTE - 모바일 320px~767px, 태블릿 768px~1023px, 데스크탑 1024px~

function Road({ roadmapApiData }: IRoad) {
  const setSelectedTechTitleState = useSetRecoilState(techTitleState);
  const setSelectedTechState = useSetRecoilState(roadmapTechState);
  const setSelectedTechId = useSetRecoilState(selectedTechIdState); // 로드맵 페이지에서 고른 기술의 아이디
  const setIsLoadingTechPage = useSetRecoilState(isLoadingTechPageState);
  const setSelectedGridIndex = useSetRecoilState(selectedGridIndexState);

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
    setCol(currentWidth >= 1024 ? 9 : currentWidth >= 768 ? 7 : 3);
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
    index: gridIndex,
  }: IOnClickTech) => {
    setSelectedTechId(selectedTechId);
    setSelectedGridIndex(gridIndex);
    setIsLoadingTechPage(true);
    setSwitchDetail(SwitchDetail.TECH);
    const data: IRoadmapTechDetail = await getRoadmapTechDetail({
      selectedTechId,
      jobId,
      companyId,
      selectedDetailedPosition,
    });
    setSelectedTechState(data);
    setSelectedTechTitleState(data.data.courseName);
    setIsLoadingTechPage(false);
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

            {/* //TODO - 뷰포트 단위 대신 픽셀로 하드코딩하고, 화면 크기 별로 레이아웃을 여러 개 구현한 뒤, 미디어쿼리로 기기에 맞게 정해진 레이아웃을 띄우는 방식으로 구현하자 */}

            {/* 오른쪽 ㄷ자 progress bar */}
            {/* {Math.floor(index / col) + 1 !== rowAll &&
            (index + 10) % (col * 2) === 0 ? (
              <>
                <ProgressBar $mediaType="rightTop" />
                <ProgressBar $mediaType="rightMid" />
              </>
            ) : null}
            {(index + 9) % (col * 2) === 0 ? (
              <ProgressBar $mediaType="rightBot" />
            ) : null} */}
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
                          index,
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
                    </TechButton>
                    {courseCol.courses.slice(1).length !== 0 ? <Rope /> : null}
                    {courseCol.courses.slice(1).length !== 0 ? (
                      <CSList>
                        {courseCol.courses.slice(1).map((cs) => (
                          <CSButton
                            key={cs.id}
                            onClick={() => {
                              onClickTech({ selectedTechId: cs.id, index });
                            }}
                          >
                            <Status width="15px" height="15px" />
                            <CSName>{cs.name}</CSName>
                          </CSButton>
                        ))}
                      </CSList>
                    ) : null}
                  </>
                ) : (
                  <>
                    {courseCol.courses.length !== 0 ? (
                      <Rope $marginTop="43px" />
                    ) : null}
                    {courseCol.courses.length !== 0 ? <Rope /> : null}
                    {courseCol.courses.length !== 0 ? (
                      <CSList>
                        {courseCol.courses.map((cs) => (
                          <CSButton
                            key={cs.id}
                            onClick={() =>
                              onClickTech({ selectedTechId: cs.id, index })
                            }
                          >
                            <Status width="15px" height="15px" />
                            <CSName>{cs.name}</CSName>
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
