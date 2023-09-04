import { styled } from "styled-components";

export const WrapperClose = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const WrapperTitleAndState = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
`;

export const CoursePageTitle = styled.h1`
  margin-right: 10px;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.mainColor};

  @media screen and (max-width: 400px) {
    font-size: 16px;
  }
`;

export const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const BackButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
