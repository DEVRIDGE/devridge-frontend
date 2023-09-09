import { Link } from "react-router-dom";
import { Col, Item, Items, LoginButton, MenuBars, Nav } from "./styles";
import { useSetRecoilState } from "recoil";
import { switchLoginState } from "../../../recoil/switchLogin/atom";
import Logo from "../logo/Logo";

function Header() {
  //NOTE - 로그인 모달 창 스위칭 아톰
  const setSwitchLogin = useSetRecoilState(switchLoginState);

  const onClickedLogin = () => {
    setSwitchLogin(true);
  };

  return (
    <Nav>
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
        <LoginButton onClick={onClickedLogin}>Login</LoginButton>
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
