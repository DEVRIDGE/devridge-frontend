import { styled } from "styled-components";

import { StatusCircle } from "../status/styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CSButton = styled.button`
  position: relative;
  margin-top: 10px;
  padding: 7px 14px;
  border: 1px solid ${(props) => props.theme.greyColor};
  border-radius: 5px;
  background-color: white;
  color: black;
  font-size: 12px;

  ${StatusCircle} {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: -10px;
  }
`;
