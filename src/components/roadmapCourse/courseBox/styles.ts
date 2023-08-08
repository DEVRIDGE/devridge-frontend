import { styled } from "styled-components";

export const CourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
  width: 100%;
  height: 200px;
  border: 1px solid ${(props) => props.theme.greyColor};
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: 1px 1px 3px 1px ${(props) => props.theme.greyColor};
  font-size: 18px;
  font-weight: 600;
`;

export const CourseThumbnailWrapper = styled.div`
  height: 50%;
`;

export const CourseThumbnail = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

export const CourseTitleWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const CourseLogoWrapper = styled.div`
  margin-right: 10px;
`;

export const CourseLogo = styled.svg`
  width: 25px;
  height: 25px;
  fill: red;
`;

export const CourseTitle = styled.h3`
  display: -webkit-box;
  overflow: hidden;
  padding-bottom: 1px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 13px;
`;

export const CourseActions = styled.div``;

export const CourseLikeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CourseLikeBtn = styled.button`
  border: none;
  background-color: transparent;
`;

export const CourseLikeSvg = styled.svg`
  width: 15px;
  height: 15px;
  fill: ${(props) => props.theme.textGreyColor};
`;

export const CourseLikeLabel = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.textGreyColor};
`;