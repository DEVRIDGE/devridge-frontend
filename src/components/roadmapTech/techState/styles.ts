import { styled } from "styled-components";

export const TechStateSelect = styled.select`
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.greyColor};
`;

export const TechStateOption = styled.option`
  text-align: center;
`;
