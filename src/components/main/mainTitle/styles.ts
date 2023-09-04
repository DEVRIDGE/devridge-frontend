import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 20vh;
  padding-bottom: 15vh;
  padding-left: 15vw;
  padding-right: 15vw;

  @media screen and (max-width: 767px) {
    padding: 15vh 10vw 10vh 10vw;
    min-width: 280px;
  }
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:first-child {
    flex-basis: 62%;
  }

  &:last-child {
    flex-basis: 25%;
    justify-content: center;
    align-items: center;
  }
`;

export const Title = styled.h1`
  margin-bottom: 5vh;
  font-size: 30px;
  font-family: ${(props) => props.theme.titleFont};

  @media screen and (max-width: 767px) {
    font-size: 26px;
  }

  @media screen and (max-width: 500px) {
    font-size: 18px;
  }
`;

export const Description = styled.h3`
  color: ${(props) => props.theme.textGreyColor};

  &:nth-of-type(1) {
    margin-bottom: 7px;
  }

  @media screen and (max-width: 767px) {
    font-size: 14px;
  }

  @media screen and (max-width: 500px) {
    font-size: 9px;
  }
`;

export const MarkerImg = styled.svg`
  width: 100%;
`;
