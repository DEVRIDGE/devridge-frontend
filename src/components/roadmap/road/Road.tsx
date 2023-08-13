import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useMemo } from "react";

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
import { IRoadmap } from "../../../services/types";
import {
  SwitchDetail,
  switchRoadmapDetailState,
} from "../../../recoil/swtichRoadmapDetail/atom";
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

interface IRoad {
  roadmapApiData?: IRoadmap;
}

function Road({ roadmapApiData }: IRoad) {
  const setSelectedTechTitleState = useSetRecoilState(techTitleState);
  const setSelectedTechState = useSetRecoilState(roadmapTechState);
  const setSelectedTechId = useSetRecoilState(selectedTechIdState);
  const setIsLoadingTechPage = useSetRecoilState(isLoadingTechPageState);

  const jobId = useRecoilValue(jobState);
  const companyId = useRecoilValue(companyState);
  const isLoadingTechPage = useRecoilValue(isLoadingTechPageState);
  const isLoadingCoursePage = useRecoilValue(isLoadingCoursePageState);

  //NOTE - 슬라이드 화면 스위칭하는 recoil atom
  const [switchDetail, setSwitchDetail] = useRecoilState(
    switchRoadmapDetailState
  );

  // NOTE - 그리드 컬럼 수
  const col = 9;

  //NOTE - 그리드 레이아웃을 위한 null 값 추가
  const [courseList, row] = useMemo(() => {
    const tmp = roadmapApiData?.data.courseList || [];
    for (let i = col; i < tmp.length; i += col) {
      tmp.splice(i, 0, null);
    }
    const row_tmp = Math.ceil(tmp.length / col);
    return [tmp, row_tmp];
  }, []);

  const onClickTech = async (selectedTechId: number) => {
    setSelectedTechId(selectedTechId);
    setIsLoadingTechPage(true);
    setSwitchDetail(SwitchDetail.TECH);
    const data: IRoadmapTechDetail = await getRoadmapTechDetail({
      selectedTechId,
      jobId,
      companyId,
    });
    setSelectedTechState(data);
    setSelectedTechTitleState(data.data.title);
    setIsLoadingTechPage(false);
  };

  //TODO - 마지막 row 덜 채워져서 오른쪽 정렬 안되는거 해결하자
  return (
    <Wrapper $col={col} $row={row}>
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
            {index === 1 ? <ProgressBar $isDone={true} /> : null}

            {/* //TODO - 뷰포트 단위 대신 픽셀로 하드코딩하고, 화면 크기 별로 레이아웃을 여러 개 구현한 뒤, 미디어쿼리로 기기에 맞게 정해진 레이아웃을 띄우는 방식으로 구현하자 */}

            {/* 오른쪽 ㄷ자 progress bar */}
            {(index + 10) % (col * 2) === 0 ? (
              <>
                <ProgressBar style={{ left: "-5vw", width: "15vw" }} />
                <ProgressBar
                  style={{
                    width: "15px",
                    height: "34.4vh",
                    left: "auto",
                    right: "-3.6vw",
                  }}
                />
              </>
            ) : null}
            {(index + 9) % (col * 2) === 0 ? (
              <ProgressBar style={{ left: "-5vw", width: "15vw" }} />
            ) : null}

            {/* 왼쪽 ㄷ자 progress bar */}
            {(index + 1) % (col * 2) === 0 ? (
              <>
                <ProgressBar style={{ left: "-2vw", width: "17vw" }} />
                <ProgressBar
                  style={{
                    width: "15px",
                    height: "34.4vh",
                    left: "-3.5vw",
                  }}
                />
              </>
            ) : null}
            {index % (col * 2) === 0 ? (
              <ProgressBar style={{ left: "-2vw", width: "17vw" }} />
            ) : null}

            {courseCol !== null ? (
              <>
                {/* ㄷ자 부분 제외하고 progress bar 렌더링하는 부분 */}
                {courseCol.index % 2 !== 0 &&
                (index + 2) % (col * 2) !== 0 &&
                (index - 1) % (col * 2) !== 0 ? (
                  <ProgressBar $isDone={courseCol.index <= 3} />
                ) : null}

                {/* 서버에서 받은 인덱스가 홀수면 기술과 CS, 짝수면 CS 단독 리스트임 */}
                {courseCol.index % 2 !== 0 ? (
                  <>
                    <TechButton
                      onClick={() => onClickTech(courseCol.courses[0].id)}
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
                              onClickTech(cs.id);
                            }}
                          >
                            <Status width="20px" height="20px" />
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
                            onClick={() => onClickTech(cs.id)}
                          >
                            <Status width="20px" height="20px" />
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
    </Wrapper>
  );
}

export default Road;
