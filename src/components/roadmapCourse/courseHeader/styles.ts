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
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.mainColor};
`;
