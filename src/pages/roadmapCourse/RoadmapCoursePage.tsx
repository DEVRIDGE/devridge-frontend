import { styled } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";

import Overlay from "../../components/common/overlay/Overlay";
import CourseHeader from "../../components/roadmapCourse/courseHeader/CourseHeader";
import CourseBox from "../../components/roadmapCourse/courseBox/CourseBox";
import { roadmapCourseState } from "../../recoil/roadmapCourseDetail/atom";
import { SwitchDetail } from "../../constants/enums";
import { switchRoadmapDetailState } from "../../recoil/swtichRoadmapDetail/atom";
import useOnClickedProfileOuter from "../../hooks/useOnClickedProfileOuter";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

const CourseMenuWrapper = styled.div`
  position: fixed;
  overflow: auto;
  top: 50px;
  right: 20px;
  bottom: 0;
  margin: auto auto;
  padding: 20px;
  width: 40vw;
  max-width: 450px;
  min-width: 320px;
  height: 80vh;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColor};

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 767px) {
    left: 0;
    right: 0;
  }

  @media screen and (max-width: 359px) {
    min-width: 240px;
    left: 0;
    right: 0;
  }
`;

const GridCourses = styled.div`
  display: grid;
  position: relative;
  overflow: auto;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  justify-items: center;
  width: 100%;
  height: max-content;
  gap: 10px;
  margin-top: 30px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

function RoadmapCoursePage() {
  const roadmapCourseDetail = useRecoilValue(roadmapCourseState);
  const setSwitchRoadmapDetail = useSetRecoilState(switchRoadmapDetailState);

  const onClickedProfileOuter = useOnClickedProfileOuter();

  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <Wrapper
      onClick={() => {
        setSwitchRoadmapDetail(SwitchDetail.TECH);
      }}
    >
      <Overlay />
      <CourseMenuWrapper
        onClick={(event) => {
          event.stopPropagation();
          onClickedProfileOuter();
        }}
      >
        <CourseHeader />
        <GridCourses>
          {roadmapCourseDetail.data!.courseVideos.map((courseVideo) => (
            <CourseBox key={courseVideo.id} {...courseVideo} />
          ))}
        </GridCourses>
      </CourseMenuWrapper>
    </Wrapper>
  );
}

export default RoadmapCoursePage;
