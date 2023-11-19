import { styled } from "styled-components";
import { UserLike } from "../../../constants/enums";

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
  box-shadow: 2px 2px 5px 0px ${(props) => props.theme.greyColor};
  font-size: 18px;
  font-weight: 600;

  @media screen and (max-width: 767px) {
    height: 270px;
  }
`;

export const CourseThumbnailWrapper = styled.div`
  height: 50%;
  box-shadow: 0 0 1px 1px ${(props) => props.theme.greyColor};

  @media screen and (max-width: 767px) {
    height: 60%;
  }
`;

export const CourseThumbnail = styled.img<{ $isVideoTap: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: ${(props) => (props.theme.$isVideoTap ? "cover" : "contain")};
  border-radius: 5px;
`;

export const CourseTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CourseLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// export const CourseLogo = styled.svg`
//   width: 25px;
//   height: 25px;
//   fill: red;
// `;

export const CourseLogo = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.textGreyColor};
`;

export const CourseTitle = styled.h3`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 13px;
  word-break: break-all;
`;

export const CourseActions = styled.div<{ $isVideoTap: boolean }>`
  display: flex;
  justify-content: ${(props) =>
    props.theme.$isVideoTap ? "space-between" : "flex-end"};
`;

export const CourseLikeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CourseLikeBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const CourseLikeSvg = styled.svg<{ $userLiked: string | null }>`
  width: 15px;
  height: 15px;
  fill: ${(props) =>
    props.$userLiked === UserLike.YES ? "red" : props.theme.textGreyColor};
`;

export const CourseLikeLabel = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.textGreyColor};
`;

export const AnchorWrapper = styled.a`
  display: contents;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;
