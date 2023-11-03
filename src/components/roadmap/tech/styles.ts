import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
  z-index: 2;
`;

export const TechName = styled.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  min-height: 35px;
  text-decoration: none;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
  text-align: center;
  font-size: 14px;
  word-break: keep-all;
`;
