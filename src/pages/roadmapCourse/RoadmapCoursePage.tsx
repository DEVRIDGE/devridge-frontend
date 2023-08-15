import { styled } from "styled-components";
import { useRecoilValue } from "recoil";

import Overlay from "../../components/common/overlay/Overlay";
import CourseHeader from "../../components/roadmapCourse/courseHeader/CourseHeader";
import CourseBox from "../../components/roadmapCourse/courseBox/CourseBox";
import { roadmapCourseState } from "../../recoil/roadmapCourseDetail/atom";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

const CourseMenuWrapper = styled.div`
  position: fixed;
  overflow: hidden;
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
  position: relative;
  overflow: auto;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  justify-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
  margin-top: 30px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

function RoadmapCoursePage() {
  const roadmapCourseDetail = useRecoilValue(roadmapCourseState);
  return (
    <Wrapper>
      <Overlay />
      <CourseMenuWrapper>
        <CourseHeader />
        <GridCourses>
          {roadmapCourseDetail.data.courseVideos.map((courseVideo) => (
            <CourseBox key={courseVideo.id} {...courseVideo} />
          ))}
        </GridCourses>
      </CourseMenuWrapper>
    </Wrapper>
  );
}

export default RoadmapCoursePage;
