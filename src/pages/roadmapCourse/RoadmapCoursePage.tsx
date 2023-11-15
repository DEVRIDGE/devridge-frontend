import { styled } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";

import Overlay from "../../components/common/overlay/Overlay";
import CourseHeader from "../../components/roadmapCourse/courseHeader/CourseHeader";
import CourseBox from "../../components/roadmapCourse/courseBox/CourseBox";
import { roadmapCourseState } from "../../recoil/roadmapCourseDetail/atom";
import { SwitchDetail } from "../../constants/enums";
import { switchRoadmapDetailState } from "../../recoil/swtichRoadmapDetail/atom";
import useOnClickedProfileOuter from "../../hooks/useOnClickedProfileOuter";
import { accessTokenState } from "../../recoil/accessToken/atom";

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

const TabMenuWrapper = styled.div<{ $isAll: boolean }>`
  display: flex;
  justify-content: ${(props) =>
    props.theme.$isAll ? "space-evenly" : "flex-start"};
  align-items: center;
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  padding-bottom: 20px;
  border-bottom: 1px dotted ${(props) => props.theme.greyColor};
`;

const TabMenu = styled.button<{ $isVideoTap: boolean }>`
  flex-basis: 50%;
  width: 100%;
  height: 40px;
  border: ${(props) =>
    props.$isVideoTap
      ? `1px solid ${props.theme.mainColor}`
      : `1px solid ${props.theme.greyColor}`};
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColor};
  font-size: 16px;
  cursor: pointer;

  &:first-child {
    margin-right: 10px;
  }

  &:hover {
    background-color: ${(props) => props.theme.mainColorLighter};
    color: ${(props) => props.theme.mainColor};
    font-weight: bold;
  }
`;

const CoupangPartnersPhrase = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  font-size: 12px;
  line-height: 130%;
  color: ${(props) => props.theme.textGreyColor};
`;

const CoursePageDescription = styled.span`
  display: block;
  padding: 10px;
  font-size: 13px;
  color: ${(props) => props.theme.textGreyColor};
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
  const [isVideoTap, setIsVideoTap] = useState(true);

  const roadmapCourseDetail = useRecoilValue(roadmapCourseState);
  const setSwitchRoadmapDetail = useSetRecoilState(switchRoadmapDetailState);

  const onClickedProfileOuter = useOnClickedProfileOuter();
  const onClickedVideoTap = () => {
    setIsVideoTap(true);
  };
  const onClickedBookTap = () => {
    setIsVideoTap(false);
  };

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
        <CoursePageDescription>
          {roadmapCourseDetail.data!.courseDetailDescription}
        </CoursePageDescription>
        <TabMenuWrapper
          $isAll={
            roadmapCourseDetail.data!.courseVideos.length > 0 &&
            roadmapCourseDetail.data!.courseBooks.length > 0
          }
        >
          {roadmapCourseDetail.data!.courseVideos.length > 0 ? (
            <TabMenu onClick={onClickedVideoTap} $isVideoTap={isVideoTap}>
              영상
            </TabMenu>
          ) : null}
          {roadmapCourseDetail.data!.courseBooks.length > 0 ? (
            <TabMenu onClick={onClickedBookTap} $isVideoTap={!isVideoTap}>
              책
            </TabMenu>
          ) : null}
        </TabMenuWrapper>
        {!isVideoTap ? (
          <CoupangPartnersPhrase>
            이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의
            수수료를 제공받습니다.
          </CoupangPartnersPhrase>
        ) : null}
        <GridCourses>
          {isVideoTap
            ? roadmapCourseDetail.data!.courseVideos.map((courseVideo) => (
                <CourseBox
                  key={courseVideo.id}
                  $isVideoTap={true}
                  {...courseVideo}
                />
              ))
            : roadmapCourseDetail.data!.courseBooks.map((courseBook) => (
                <CourseBox
                  key={courseBook.id}
                  $isVideoTap={false}
                  {...courseBook}
                />
              ))}
        </GridCourses>
      </CourseMenuWrapper>
    </Wrapper>
  );
}

export default RoadmapCoursePage;
