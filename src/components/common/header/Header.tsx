import { Link, useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import {
  Col,
  Item,
  Items,
  LoginButton,
  MenuBars,
  Nav,
  Profile,
  ProfileDropdownList,
  ProfileDropdownOption,
  ProfileWrapper,
} from "./styles";
import { switchLoginState } from "../../../recoil/switchLogin/atom";
import Logo from "../logo/Logo";
import { isProfileDropdownState } from "../../../recoil/isProfileDropdown/atoms";
import useOnClickedProfileOuter from "../../../hooks/useOnClickedProfileOuter";
import { accessTokenState } from "../../../recoil/accessToken/atom";
import { isLoginState } from "../../../recoil/isLogin/atoms";

function Header() {
  const history = useHistory();

  //NOTE - 로그인 모달 창 스위칭 아톰
  const setSwitchLogin = useSetRecoilState(switchLoginState);

  const [isProfileDropdown, setIsProfileDropdown] = useRecoilState(
    isProfileDropdownState
  );

  const setAccessToken = useSetRecoilState(accessTokenState);

  const onClickedProfileOuter = useOnClickedProfileOuter();

  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const onClickedLogin = () => {
    setSwitchLogin(true);
  };

  const onClickedProfile = (event: any) => {
    event.stopPropagation();
    setIsProfileDropdown((prev) => !prev);
  };

  const onClickedLogout = () => {
    history.push("/");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    setIsLogin(false);
    window.location.reload();
  };

  return (
    <Nav onClick={onClickedProfileOuter}>
      <Col>
        <Link to="/">
          <Logo />
        </Link>
        <Items>
          <Item>공지사항</Item>
          <Item>이벤트</Item>
        </Items>
      </Col>
      <Col>
        {isLogin ? (
          <ProfileWrapper>
            <Profile
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              onClick={onClickedProfile}
            >
              {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </Profile>
            {isProfileDropdown ? (
              <ProfileDropdownList>
                <ProfileDropdownOption>프로필</ProfileDropdownOption>
                <ProfileDropdownOption onClick={onClickedLogout}>
                  로그아웃
                </ProfileDropdownOption>
              </ProfileDropdownList>
            ) : null}
          </ProfileWrapper>
        ) : (
          <LoginButton onClick={onClickedLogin}>로그인</LoginButton>
        )}
        <Link to="/menuMobile">
          <MenuBars
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </MenuBars>
        </Link>
      </Col>
    </Nav>
  );
}

export default Header;
