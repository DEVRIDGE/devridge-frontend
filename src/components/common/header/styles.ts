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
  box-sizing: border-box;
`;

export const Col = styled.div`
  display: flex;
`;

export const Items = styled.ul`
  display: flex;
  align-items: center;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const Item = styled.li`
  margin-left: 20px;
  padding: 5px;
  font-size: 12px;
  cursor: pointer;
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

export const ProfileWrapper = styled.div`
  position: relative;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const Profile = styled.svg`
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.mainColorLighter};
  fill: ${(props) => props.theme.mainColor};
  cursor: pointer;

  @media screen and (max-width: 767px) {
    display: block;
  }
`;

export const ProfileDropdownList = styled.ul`
  position: absolute;
  top: 30px;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  padding: 10px;
  width: max-content;
  max-width: 200px;
  border: 1px solid ${(props) => props.theme.greyColor};
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColor};
`;

export const ProfileDropdownOption = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 7px;
  border-radius: 5px;
  font-size: 14px;
  color: ${(props) => props.theme.textGreyColor};
  word-break: keep-all;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.mainColorLighter};
    color: ${(props) => props.theme.mainColor};
    font-weight: bold;
  }
`;

export const UserProfilePictureWrapper = styled.div`
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

export const UserProfilePicture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid ${(props) => props.theme.textGreyColor};
  border-radius: 50%;
  background-color: ${(props) => props.theme.bgColor};
`;
