import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5vh 20vw;
  padding: 20px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const Job = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${(props) => props.theme.pretendardExtraBold};
  font-size: 30px;
  font-weight: bolder;

  @media screen and (max-width: 400px) {
    font-size: 24px;
    white-space: nowrap;
  }
`;

export const Company = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${(props) => props.theme.pretendardExtraBold};

  margin-right: 10px;
  font-size: 30px;
  font-weight: bolder;

  @media screen and (max-width: 767px) {
    margin-right: 0;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 400px) {
    font-size: 24px;
    white-space: nowrap;
  }
`;
