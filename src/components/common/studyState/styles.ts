import { styled } from "styled-components";

export const StudyStateSelect = styled.select`
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.greyColor};
`;

export const StudyStateOption = styled.option`
  text-align: center;
`;
