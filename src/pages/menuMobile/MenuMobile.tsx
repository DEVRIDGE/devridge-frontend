import { styled } from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";

import CloseBtnSvg from "../../components/common/closeBtnSvg/CloseBtnSvg";
import { switchLoginState } from "../../recoil/switchLogin/atom";
import { BASE_PATH } from "../../services/apis";
import { isLoginState } from "../../recoil/isLogin/atoms";
import { accessTokenState } from "../../recoil/accessToken/atom";
import issueNewAccessTokenHook from "../../utils/issueNewAccessTokenHook";
import ChannelService from "../../services/ChannelService";

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
  const { detect } = require("detect-browser");
  const browser = detect();

  const history = useHistory();
  const setSwitchLogin = useSetRecoilState(switchLoginState);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const onClickedLogin = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (browser.name === "kakaotalk") {
      event.preventDefault();
      alert(
        "정책 문제로 카카오톡 브라우저에서는 구글 로그인을 지원히지 않습니다. 다른 브라우저를 이용해주세요."
      );
    } else if (browser.name === "chromium-webview") {
      event.preventDefault();
      alert(
        "정책 문제로 chromium-webview에서는 구글 로그인을 지원히지 않습니다. 다른 브라우저를 이용해주세요."
      );
    } else if (browser.name === "samsung") {
      event.preventDefault();
      alert(
        "현재 삼성 인터넷 브라우저에서는 일시적으로 로그인 기능을 지원히지 않습니다. 다른 브라우저를 이용해주세요."
      );
    } else {
      setSwitchLogin(true);
    }
  };

  const onClickedCloseButton = () => {
    history.goBack();
  };

  const onClickedLogout = () => {
    history.push("/");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    setIsLogin(false);
    window.location.reload();
  };

  useEffect(() => {
    const channelTalk = new ChannelService();
    channelTalk.boot({ pluginKey: "879e637c-369e-44e8-a44e-21b8fd3d0f63" });

    setSwitchLogin(false);

    if (localStorage.getItem("refreshToken")) {
      setIsLogin(true);
    }

    const handleRefreshPageIssueToken = async () => {
      const newAccessToken: string | null = await issueNewAccessTokenHook();
      if (newAccessToken === "/") {
        setIsLogin(false);
        setAccessToken(null);
        history.push("/");
      } else {
        setAccessToken(newAccessToken);
      }
      return;
    };

    if (!accessToken && localStorage.getItem("refreshToken")) {
      handleRefreshPageIssueToken();
    }
  }, []);

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
          {/* <Item>
            <Link to="/">공지사항</Link>
          </Item>
          <Item>
            <Link to="/">이벤트</Link>
          </Item>
          {isLogin ? (
            <Item>
              <Link to="/">프로필</Link>
            </Item>
          ) : null} */}
        </Items>
        {isLogin ? (
          <LoginButton onClick={onClickedLogout}>로그아웃</LoginButton>
        ) : (
          <>
            <LoginButton
              href={`${BASE_PATH}/oauth2/authorization/google`}
              onClick={(event) => onClickedLogin(event)}
            >
              로그인
            </LoginButton>
          </>
        )}
      </WrapperContent>
    </WrapperPage>
  );
}

export default MenuMobile;
