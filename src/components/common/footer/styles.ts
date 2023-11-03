import { styled } from "styled-components";

export const Wrapper = styled.footer`
  display: flex;
  position: absolute;
  bottom: 0;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  width: 100%;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  background-color: white;

  @media screen and (max-width: 767px) {
    padding: 5px 10px;
  }
`;

export const Item = styled.li`
  font-size: 10px;
  color: ${(props) => props.theme.textGreyColor};

  @media screen and (max-width: 767px) {
    zoom: 0.7;
  }
`;

export const Col = styled.div`
  display: flex;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const Logo = styled.svg`
  margin-right: 20px;
  width: 100px;

  @media screen and (max-width: 767px) {
    width: 60px;
  }
`;

export const Teams = styled.ul`
  ${Item}:first-child {
    margin-bottom: 10px;

    @media screen and (max-width: 767px) {
      margin-bottom: 5px;
    }
  }
`;

export const TeamInfo = styled.div`
  display: flex;
  ${Item}:nth-of-type(2) {
    @media screen and (max-width: 767px) {
      display: none;
    }
  }

  ${Item}:first-child {
    @media screen and (max-width: 767px) {
      margin-right: 5px;
    }
  }

  @media screen and (max-width: 767px) {
    flex-direction: row;
  }
`;

export const Info = styled.ul`
  display: flex;

  ${Item} {
    margin-right: 10px;

    @media screen and (max-width: 767px) {
      margin-right: 0;
    }
  }

  ${Item}:last-child {
    margin-right: 0;

    @media screen and (max-width: 767px) {
      margin-top: 10px;
    }
  }

  ${Item}:nth-of-type(2) {
    @media screen and (max-width: 767px) {
      display: none;
    }
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const Policy = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.textGreyColor};
  cursor: pointer;
`;
