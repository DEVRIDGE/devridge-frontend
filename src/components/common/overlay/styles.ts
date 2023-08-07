import { styled } from "styled-components";

export const OverlayBox = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.textGreyColor};
`;
