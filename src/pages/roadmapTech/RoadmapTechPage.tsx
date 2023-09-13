import { styled } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";

import TechHeader from "../../components/roadmapTech/techHeader/TechHeader";
import Overlay from "../../components/common/overlay/Overlay";
import { roadmapTechState } from "../../recoil/roadmapTechDetail/atom";
import { selectedTechIdState } from "../../recoil/selectedTechId/atom";
import { getRoadmapCourseDetail } from "../../services/apis";
import { jobState } from "../../recoil/jobId/atom";
import { companyState } from "../../recoil/companyId/atom";
import { roadmapCourseState } from "../../recoil/roadmapCourseDetail/atom";
import { switchRoadmapDetailState } from "../../recoil/swtichRoadmapDetail/atom";
import { courseTitleState } from "../../recoil/courseTitle/atom";
import { isLoadingCoursePageState } from "../../recoil/isLoadingCoursePage/atom";
import { SwitchDetail } from "../../constants/enums";

interface IOnClickTechButton {
  selectedCourseId: number;
  selectedCourseTitle: string;
}

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

const TechMenuWrapper = styled.div`
  position: fixed;
  top: 50px;
  right: 20px;
  bottom: 0;
  margin: auto auto;
  padding: 20px;
  width: 40vw;
  max-width: 450px;
  min-width: 260px;
  height: 80vh;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColor};

  @media screen and (max-width: 767px) {
    left: 0;
    right: 0;
  }
`;

const GridButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  justify-items: center;
  gap: 10px;
  margin-top: 50px;

  a {
    width: 100%;
  }
`;

const TechButton = styled.button`
  width: 100%;
  height: 100px;
  border: 1px solid ${(props) => props.theme.greyColor};
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: 1px 1px 3px 1px ${(props) => props.theme.greyColor};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;

  @media screen and (max-width: 400px) {
    font-size: 16px;
  }
`;

function RoadmapTechPage() {
  const setSwitchRoadmapDetail = useSetRecoilState(switchRoadmapDetailState);
  const setSelectedCourseTitle = useSetRecoilState(courseTitleState);
  const setRoadmapCourseState = useSetRecoilState(roadmapCourseState);
  const setIsLoadingCoursePage = useSetRecoilState(isLoadingCoursePageState);

  const selectedTechState = useRecoilValue(roadmapTechState);

  const onClickTechButton = async ({
    selectedCourseId, //NOTE - 세부 기술 선택 화면에서 고른 세부 기술
    selectedCourseTitle,
  }: IOnClickTechButton) => {
    setIsLoadingCoursePage(true);
    setSwitchRoadmapDetail(SwitchDetail.COURSE);
    const data = await getRoadmapCourseDetail({
      selectedCourseId,
    });
    setRoadmapCourseState(data);
    setSelectedCourseTitle(selectedCourseTitle);
    setIsLoadingCoursePage(false);
  };

  return (
    <Wrapper>
      <Overlay />
      <TechMenuWrapper>
        <TechHeader />
        <GridButtons>
          {selectedTechState.data.courseDetails.map((courseDetail) => (
            <TechButton
              onClick={() =>
                onClickTechButton({
                  selectedCourseId: courseDetail.id,
                  selectedCourseTitle: courseDetail.name,
                })
              }
              key={courseDetail.id}
            >
              {courseDetail.name}
            </TechButton>
          ))}
        </GridButtons>
      </TechMenuWrapper>
    </Wrapper>
  );
}

export default RoadmapTechPage;
