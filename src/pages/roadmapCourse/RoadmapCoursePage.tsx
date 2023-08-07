import { styled } from "styled-components";
import Overlay from "../../components/common/overlay/Overlay";
import CourseHeader from "../../components/roadmapCourse/courseHeader/CourseHeader";
import CourseBox from "../../components/roadmapCourse/courseBox/CourseBox";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

const CourseMenuWrapper = styled.div`
  position: fixed;
  top: 50px;
  right: 20px;
  bottom: 0;
  margin: auto auto;
  padding: 20px;
  width: 40vw;
  height: 90vh;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColor};
`;

const GridCourses = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  justify-items: center;
  gap: 10px;
  margin-top: 50px;
`;

function RoadmapCoursePage() {
  return (
    <Wrapper>
      <Overlay />
      <CourseMenuWrapper>
        <CourseHeader />
        <GridCourses>
          <CourseBox />
          <CourseBox />
          <CourseBox />
          <CourseBox />
          <CourseBox />
          <CourseBox />
        </GridCourses>
      </CourseMenuWrapper>
    </Wrapper>
  );
}

export default RoadmapCoursePage;
