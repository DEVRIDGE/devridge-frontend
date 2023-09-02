import { styled } from "styled-components";

export const Nav = styled.nav`
  display: flex;
  position: fixed;
  top: 0;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  width: 100%;
  height: 50px;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  background-color: white;
  z-index: 99;
`;

export const Col = styled.div`
  display: flex;
`;

export const Logo = styled.svg`
  margin-right: 30px;
  width: 100px;
  height: 50px;
`;

export const Items = styled.ul`
  display: flex;
  align-items: center;
`;

export const Item = styled.li`
  margin-right: 20px;
  font-size: 12px;
`;

export const LoginButton = styled.button`
  padding: 5px 15px;
  border: 1px solid ${(props) => props.theme.mainColor};
  border-radius: 7%;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.mainColor};
  cursor: pointer;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const MenuBars = styled.svg`
  display: none;

  @media screen and (max-width: 767px) {
    display: block;
  }
`;
