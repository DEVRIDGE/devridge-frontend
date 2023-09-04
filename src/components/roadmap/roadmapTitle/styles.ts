import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5vh 20vw;
  padding: 20px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
`;

export const Job = styled.h1`
  margin-right: 10px;
  font-size: 24px;
  font-weight: 600;

  @media screen and (max-width: 400px) {
    font-size: 16px;
    white-space: nowrap;
  }
`;

export const Company = styled.h1`
  font-size: 24px;
  font-weight: 600;

  @media screen and (max-width: 400px) {
    font-size: 16px;
    white-space: nowrap;
  }
`;
