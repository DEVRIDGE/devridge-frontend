import { styled } from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import CloseBtnSvg from "../../components/common/closeBtnSvg/CloseBtnSvg";
import { switchLoginState } from "../../recoil/switchLogin/atom";
import { BASE_PATH } from "../../services/apis";

const WrapperPage = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.textGreyColor};
`;

const WrapperContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  height: 100%;
  box-shadow: 0 0 2px 2px ${(props) => props.theme.greyColor};
  background-color: ${(props) => props.theme.bgColor};
`;

const CloseHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  width: 100%;
`;

const Items = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  border: 1px solid ${(props) => props.theme.greyColor};
  border-right: 0;
  border-left: 0;
  font-size: 18px;

  a {
    padding: 10px 50px;
    text-decoration: none;
    color: ${(props) => props.theme.textColor};
  }
`;

const LoginButton = styled.a`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 40px;
  padding: 15px;
  width: 70%;
  border-radius: 5px;
  background-color: ${(props) => props.theme.mainColor};
  color: white;
  font-size: 18px;
  text-decoration: none;
  cursor: pointer;
`;

const CloseBtn = styled.button`
  padding: 3px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

function MenuMobile() {
  const history = useHistory();
  const setSwitchLogin = useSetRecoilState(switchLoginState);

  const onClickedLogin = () => {
    setSwitchLogin(true);
  };

  const onClickedCloseButton = () => {
    history.push("/");
  };

  return (
    <WrapperPage>
      <WrapperContent>
        <CloseHeader>
          <CloseBtn onClick={onClickedCloseButton}>
            <CloseBtnSvg />
          </CloseBtn>
        </CloseHeader>
        <Items>
          <Item>
            <Link to="/">Home</Link>
          </Item>
          <Item>
            <Link to="/">공지사항</Link>
          </Item>
          <Item>
            <Link to="/">이벤트</Link>
          </Item>
        </Items>
        <LoginButton
          href={`${BASE_PATH}/oauth2/authorization/google`}
          onClick={onClickedLogin}
        >
          Login
        </LoginButton>
      </WrapperContent>
    </WrapperPage>
  );
}

export default MenuMobile;
