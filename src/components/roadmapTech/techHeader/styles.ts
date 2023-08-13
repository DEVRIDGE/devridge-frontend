import { styled } from "styled-components";

export const WrapperClose = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const WrapperTitleAndState = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
`;

export const TechTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.mainColor};
`;

export const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
