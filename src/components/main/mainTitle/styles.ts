import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20vh;
  margin-bottom: 15vh;
  margin-left: 15vw;
  margin-right: 15vw;

  @media screen and (max-width: 767px) {
    margin: 15vh 10vw 10vh 10vw;
    min-width: 320px;
  }
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  margin-bottom: 5vh;
  font-size: 30px;
  font-family: ${(props) => props.theme.titleFont};

  @media screen and (max-width: 767px) {
    font-size: 26px;
  }
`;

export const Description = styled.h3`
  color: ${(props) => props.theme.textGreyColor};

  &:nth-of-type(1) {
    margin-bottom: 7px;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    font-size: 14px;
  }
`;

export const MarkerImg = styled.svg`
  width: 13vw;
`;
