import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Status = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  width: 25px;
  height: 25px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  background-color: white;
`;

export const Checker = styled.svg`
  fill: rgba(0, 0, 0, 0.1);
`;

export const TechName = styled.span`
  font-size: 14px;
`;
