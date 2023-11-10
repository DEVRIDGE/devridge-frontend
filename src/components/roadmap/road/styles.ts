import { styled } from "styled-components";

import { StatusCircle } from "../status/styles";
import { MediaType } from "../../../constants/enums";

interface IWrapper {
  $col: number;
  $row: number;
}

interface IProgressBar {
  $studyStatusCode?: number;
  $mediaType?: string; // null 불인정으로 바꾸자
}

export const Wrapper = styled.div<IWrapper>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$col}, minmax(50px, 1fr));
  grid-template-rows: repeat(${(props) => props.$row}, minmax(300px, 1fr));
  gap: 50px 20px;
  margin-top: 30px;
  padding: 50px;
  width: 1024px;

  @media screen and (max-width: 1023px) {
    grid-template-rows: repeat(${(props) => props.$row}, minmax(280px, 1fr));
    gap: 50px 10px;
    padding: 30px;
    width: 768px;
  }

  @media screen and (max-width: 767px) {
    grid-template-rows: repeat(${(props) => props.$row}, minmax(250px, 1fr));
    gap: 50px 1px;
    padding: 10px;
    width: 330px;
  }

  @media screen and (max-width: 359px) {
    grid-template-rows: repeat(${(props) => props.$row}, minmax(230px, 1fr));
    gap: 50px 10px;
    padding: 20px;
    width: 280px;
  }
`;

export const WrapperItem = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

export const Rope = styled.div<{ $marginTop?: string; $height?: string }>`
  margin-top: ${(props) => props.$marginTop || "3px"};
  width: 1px;
  height: ${(props) => props.$height || "30px"};
  border: 1px dashed ${(props) => props.theme.greyColor};
`;

export const TechButton = styled.button`
  position: relative;
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 5px;
  width: 90px;
  height: 50px;
  border: 1px solid ${(props) => props.theme.greyColor};
  border-radius: 5px;
  background-color: white;
  color: black;
  font-size: 12px;
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
    width: 53px;
    height: 40px;
    font-size: 11px;
  }

  @media screen and (max-width: 359px) {
    width: 60px;
    height: 35px;
    font-size: 10px;
  }
`;

export const CSName = styled.span`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
`;

export const Flag = styled.svg<{ $isCS?: boolean }>`
  position: absolute;
  top: ${(props) => (props.$isCS === true ? "-15px" : "-25px")};
  left: ${(props) => (props.$isCS === true ? "auto" : 0)};
  right: ${(props) => (props.$isCS === true ? "5px" : 0)};
  margin: ${(props) => (props.$isCS === true ? "0 0" : "auto auto")};
  width: ${(props) => (props.$isCS === true ? "15px" : "25px")};
  height: ${(props) => (props.$isCS === true ? "15px" : "25px")};
  transform: translateX(8px) ${(props) => (props.$isCS ? "rotate(10deg)" : "")};
`;

export const ProgressBar = styled.div<IProgressBar>`
  position: absolute;
  border: none;
  top: 10px;
  background-color: ${(props) =>
    props.$studyStatusCode === 2
      ? props.theme.mainColor
      : props.theme.greyColor};

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
    } else if (props.$mediaType === MediaType.normalReverse) {
      return "-160px";
    }
  }};
  width: ${(props) => {
    if (
      props.$mediaType === MediaType.normal ||
      props.$mediaType === MediaType.normalReverse
    ) {
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
        return "-16.8px";
      } else if (props.$mediaType === MediaType.normalReverse) {
        return "-150px";
      }
    }};
    width: ${(props) => {
      if (
        props.$mediaType === MediaType.normal ||
        props.$mediaType === MediaType.normalReverse
      ) {
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
        return "345px";
      } else {
        return "15px";
      }
    }};
  }

  /* 모바일 미디어 쿼리 */
  @media screen and (max-width: 767px) {
    left: ${(props) => {
      if (props.$mediaType === MediaType.normal) {
        return "-90px";
      } else if (
        props.$mediaType === MediaType.rightTop ||
        props.$mediaType === MediaType.rightBot
      ) {
        return "-42px";
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
        return "-21.6px";
      } else if (props.$mediaType === MediaType.normalReverse) {
        return "-90px";
      }
    }};
    width: ${(props) => {
      if (
        props.$mediaType === MediaType.normal ||
        props.$mediaType === MediaType.normalReverse
      ) {
        return "110px";
      } else if (
        props.$mediaType === MediaType.rightTop ||
        props.$mediaType === MediaType.rightBot
      ) {
        return "110px";
      } else if (
        props.$mediaType === MediaType.rightMid ||
        props.$mediaType === MediaType.leftMid
      ) {
        return "15px";
      } else if (
        props.$mediaType === MediaType.leftTop ||
        props.$mediaType === MediaType.leftBot
      ) {
        return "110px";
      }
    }};
    height: ${(props) => {
      if (
        props.$mediaType === MediaType.rightMid ||
        props.$mediaType === MediaType.leftMid
      ) {
        return "315px";
      } else {
        return "15px";
      }
    }};
  }

  /* 모바일(플립) 미디어 쿼리 */
  @media screen and (max-width: 359px) {
    left: ${(props) => {
      if (props.$mediaType === MediaType.normal) {
        return "-110px";
      } else if (
        props.$mediaType === MediaType.rightTop ||
        props.$mediaType === MediaType.rightBot
      ) {
        return "-53px";
      } else if (
        props.$mediaType === MediaType.leftTop ||
        props.$mediaType === MediaType.leftBot
      ) {
        return "-4px";
      } else if (props.$mediaType === MediaType.leftMid) {
        return "-16px";
      }
    }};
    right: ${(props) => {
      if (props.$mediaType === MediaType.rightMid) {
        return "-15.8px";
      } else if (props.$mediaType === MediaType.normalReverse) {
        return "-110px";
      }
    }};
    width: ${(props) => {
      if (
        props.$mediaType === MediaType.normal ||
        props.$mediaType === MediaType.normalReverse
      ) {
        return "160px";
      } else if (
        props.$mediaType === MediaType.rightTop ||
        props.$mediaType === MediaType.rightBot
      ) {
        return "130px";
      } else if (
        props.$mediaType === MediaType.rightMid ||
        props.$mediaType === MediaType.leftMid
      ) {
        return "12px";
      } else if (
        props.$mediaType === MediaType.leftTop ||
        props.$mediaType === MediaType.leftBot
      ) {
        return "130px";
      }
    }};
    height: ${(props) => {
      if (
        props.$mediaType === MediaType.rightMid ||
        props.$mediaType === MediaType.leftMid
      ) {
        return "292px";
      } else {
        return "12px";
      }
    }};
  }
`;
