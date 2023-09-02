import { styled } from "styled-components";

import { StatusCircle } from "../status/styles";
import { MediaType } from "../../../constants/enums";

interface IWrapper {
  $col: number;
  $row: number;
}

interface IProgressBar {
  $isDone?: boolean;
  $mediaType?: string; // null 불인정으로 바꾸자
}

export const Wrapper = styled.div<IWrapper>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$col}, minmax(50px, 1fr));
  grid-template-rows: repeat(${(props) => props.$row}, minmax(250px, 1fr));
  gap: 100px 20px;
  padding: 50px;
  width: 1024px;

  @media screen and (max-width: 1023px) {
    gap: 100px 10px;
    padding: 30px;
    width: 768px;
  }

  @media screen and (max-width: 767px) {
    gap: 100px 10px;
    padding: 10px;
    width: 320px;
  }
`;

export const WrapperItem = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

export const Rope = styled.div<{ $marginTop?: string }>`
  margin-top: ${(props) => props.$marginTop || "3px"};
  width: 1px;
  height: 50px;
  border: 1px dashed ${(props) => props.theme.greyColor};
`;

export const TechButton = styled.button`
  display: contents;
  cursor: pointer;
`;

export const OverlayWrapper = styled.div`
  position: fixed;
  z-index: 3;
`;

export const CSList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CSButton = styled.button`
  position: relative;
  margin-top: 10px;
  padding: 5px;
  width: 100px;
  height: 50px;
  border: 1px solid ${(props) => props.theme.greyColor};
  border-radius: 5px;
  background-color: white;
  color: black;
  font-size: 12px;
  word-break: break-all;
  cursor: pointer;

  ${StatusCircle} {
    position: absolute;
    margin: auto;
    top: -8px;
    left: -8px;
  }

  @media screen and (max-width: 1023px) {
    width: 85px;
    height: 45px;
  }

  @media screen and (max-width: 767px) {
    width: 70px;
    height: 40px;
    font-size: 10px;
  }
`;

export const CSName = styled.span`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: keep-all;
`;

export const ProgressBar = styled.div<IProgressBar>`
  position: absolute;
  border: none;
  top: 10px;
  left: ${(props) => {
    if (props.$mediaType === MediaType.normal) {
      return "-160px";
    } else if (
      props.$mediaType === MediaType.rightTop ||
      props.$mediaType === MediaType.rightBot
    ) {
      return "-53px";
    } else if (
      props.$mediaType === MediaType.leftTop ||
      props.$mediaType === MediaType.leftBot
    ) {
      return "-20px";
    } else if (props.$mediaType === MediaType.leftMid) {
      return "-35px";
    }
  }};
  right: ${(props) => {
    if (props.$mediaType === MediaType.rightMid) {
      return "-37px";
    }
  }};
  width: ${(props) => {
    if (props.$mediaType === MediaType.normal) {
      return "210px";
    } else if (
      props.$mediaType === MediaType.rightTop ||
      props.$mediaType === MediaType.rightBot
    ) {
      return "160px";
    } else if (
      props.$mediaType === MediaType.rightMid ||
      props.$mediaType === MediaType.leftMid
    ) {
      return "15px";
    } else if (
      props.$mediaType === MediaType.leftTop ||
      props.$mediaType === MediaType.leftBot
    ) {
      return "160px";
    }
  }};
  height: ${(props) => {
    if (
      props.$mediaType === MediaType.rightMid ||
      props.$mediaType === MediaType.leftMid
    ) {
      return "365px";
    } else {
      return "15px";
    }
  }};

  background-color: ${(props) =>
    props.$isDone ? props.theme.mainColor : props.theme.greyColor};

  /* 태블릿 미디어 쿼리 */
  @media screen and (max-width: 1023px) {
    left: ${(props) => {
      if (props.$mediaType === MediaType.normal) {
        return "-150px";
      } else if (
        props.$mediaType === MediaType.rightTop ||
        props.$mediaType === MediaType.rightBot
      ) {
        return "-55.5px";
      } else if (
        props.$mediaType === MediaType.leftTop ||
        props.$mediaType === MediaType.leftBot
      ) {
        return "-5px";
      } else if (props.$mediaType === MediaType.leftMid) {
        return "-20px";
      }
    }};
    right: ${(props) => {
      if (props.$mediaType === MediaType.rightMid) {
        return "-17px";
      }
    }};
    width: ${(props) => {
      if (props.$mediaType === MediaType.normal) {
        return "180px";
      } else if (
        props.$mediaType === MediaType.rightTop ||
        props.$mediaType === MediaType.rightBot
      ) {
        return "150px";
      } else if (
        props.$mediaType === MediaType.rightMid ||
        props.$mediaType === MediaType.leftMid
      ) {
        return "15px";
      } else if (
        props.$mediaType === MediaType.leftTop ||
        props.$mediaType === MediaType.leftBot
      ) {
        return "150px";
      }
    }};
    height: ${(props) => {
      if (
        props.$mediaType === MediaType.rightMid ||
        props.$mediaType === MediaType.leftMid
      ) {
        return "365px";
      } else {
        return "15px";
      }
    }};
  }

  /* 모바일 미디어 쿼리 */
  @media screen and (max-width: 767px) {
    left: ${(props) => {
      if (props.$mediaType === MediaType.normal) {
        return "-110px";
      } else if (
        props.$mediaType === MediaType.rightTop ||
        props.$mediaType === MediaType.rightBot
      ) {
        return "-60px";
      } else if (
        props.$mediaType === MediaType.leftTop ||
        props.$mediaType === MediaType.leftBot
      ) {
        return "-6px";
      } else if (props.$mediaType === MediaType.leftMid) {
        return "-21px";
      }
    }};
    right: ${(props) => {
      if (props.$mediaType === MediaType.rightMid) {
        return "-21.5px";
      }
    }};
    width: ${(props) => {
      if (props.$mediaType === MediaType.normal) {
        return "160px";
      } else if (
        props.$mediaType === MediaType.rightTop ||
        props.$mediaType === MediaType.rightBot
      ) {
        return "160px";
      } else if (
        props.$mediaType === MediaType.rightMid ||
        props.$mediaType === MediaType.leftMid
      ) {
        return "15px";
      } else if (
        props.$mediaType === MediaType.leftTop ||
        props.$mediaType === MediaType.leftBot
      ) {
        return "160px";
      }
    }};
    height: ${(props) => {
      if (
        props.$mediaType === MediaType.rightMid ||
        props.$mediaType === MediaType.leftMid
      ) {
        return "365px";
      } else {
        return "15px";
      }
    }};
  }
`;
