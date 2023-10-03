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

export const LegendIconBox = styled.div`
  margin-right: 5px;
  width: 20px;
  height: 15px;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.matchingFlagColor};
`;

export const LegendIconCircle = styled.div`
  margin-right: 5px;
  width: 15px;
  height: 15px;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.matchingFlagColor};
  border-radius: 50%;
`;

export const LegendText = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.textGreyColor};
`;

export const LegendIconSeparate = styled.span`
  margin-right: 5px;
  font-size: 15px;
  color: ${(props) => props.theme.textGreyColor};
`;
