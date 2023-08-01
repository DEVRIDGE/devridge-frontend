import { styled } from "styled-components";

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20vw;
  padding: 10px;
  height: 50px;
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
`;
