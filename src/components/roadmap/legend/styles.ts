import { styled } from "styled-components";

export const LegendWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 40px;
  left: 30px;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 767px) {
    position: static;
    margin-bottom: 20px;
  }
`;

export const LegendIcon = styled.div`
  margin-right: 5px;
  width: 25px;
  height: 15px;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.matchingFlagColor};
`;

export const LegendText = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.textGreyColor};
`;
