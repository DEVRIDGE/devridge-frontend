import { styled } from "styled-components";

interface IStatusCircle {
  width: string;
  height: string;
  $studyStatusCode: number;
}

export const StatusCircle = styled.div<IStatusCircle>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 2px solid
    ${(props) => {
      if (props.$studyStatusCode === 0) {
        return props.theme.greyColor;
      } else if (props.$studyStatusCode === 1) {
        return props.theme.mainColor;
      } else {
        return "white";
      }
    }};
  border-radius: 50%;
  background-color: ${(props) =>
    props.$studyStatusCode === 2 ? props.theme.mainColor : "white"};
`;

export const Checker = styled.svg<{ $studyStatusCode: number }>`
  fill: ${(props) =>
    props.$studyStatusCode === 0
      ? props.theme.greyColor
      : props.$studyStatusCode === 1
      ? props.theme.mainColor
      : "white"};
`;
