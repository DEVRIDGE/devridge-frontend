import { styled } from "styled-components";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import Overlay from "../../components/common/overlay/Overlay";
import CloseBtnSvg from "../../components/common/closeBtnSvg/CloseBtnSvg";
import Logo from "../../components/common/logo/Logo";
import { switchLoginState } from "../../recoil/switchLogin/atom";
import { BEFORE_LOGIN_PATH } from "../../constants/constants";
import { BASE_PATH } from "../../services/apis";
import { accessTokenState } from "../../recoil/accessToken/atom";
import issueNewAccessTokenHook from "../../utils/issueNewAccessTokenHook";

interface ILogin {
  beforeLoginPath: string;
}

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto auto;
  padding: 10px;
  width: 400px;
  height: 400px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColor};
  border: 3px solid ${(props) => props.theme.mainColor};

  svg {
    transform: scale(1.3);
  }

  @media screen and (max-width: 500px) {
    width: 270px;
    height: 400px;
  }
`;

const CloseBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const CloseBtn = styled.button`
  padding: 3px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const SocialLoginBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

//TODO - 구글 브랜딩 가이드 추후에 더 면밀히 살펴보고 reject 안 당하게 조심하자
const LoginGoogleButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  height: 53px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 2px 2px ${(props) => props.theme.greyColor};
  background-color: white;
  text-decoration: none;
  cursor: pointer;
`;

const GoogleLogo = styled.svg``;

const GoogleText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  font-family: "Roboto";
  font-size: 16px;
  color: black;
  word-break: keep-all;

  @media screen and (max-width: 767px) {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 15px;
  }

  @media screen and (max-width: 359px) {
    padding-left: 5px;
    padding-right: 5px;
    font-size: 15px;
  }
`;

function Login({ beforeLoginPath }: ILogin) {
  const { detect } = require("detect-browser");
  const browser = detect();

  const setSwitchLogin = useSetRecoilState(switchLoginState);

  const history = useHistory();
  const setAccessToken = useSetRecoilState(accessTokenState);

  useEffect(() => {
    localStorage.setItem(BEFORE_LOGIN_PATH, beforeLoginPath);

    const issueNewAccessTokenHookWrapper = async () => {
      const newAccessToken: string | null = await issueNewAccessTokenHook();

      if (newAccessToken === "/") {
        history.push("/");
      } else {
        setAccessToken(newAccessToken);
      }
    };

    issueNewAccessTokenHookWrapper();
  }, []);

  const onClickedCloseButton = () => {
    setSwitchLogin(false);
  };

  const onClickedLogin = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // if (browser.name === "chrome") {
    //   event.preventDefault();
    //   alert(
    //     "정책 문제로 카카오톡 브라우저에서는 구글 로그인을 지원히지 않습니다. 다른 브라우저를 이용해주세요."
    //   );
    // }
    event.preventDefault();
    alert(browser.name);
    setSwitchLogin(true);
  };

  return (
    <Wrapper>
      <Overlay />
      <ModalWrapper>
        <CloseBtnWrapper>
          <CloseBtn onClick={onClickedCloseButton}>
            <CloseBtnSvg />
          </CloseBtn>
        </CloseBtnWrapper>
        <Logo />
        <SocialLoginBoxWrapper>
          <LoginGoogleButton
            href={`${BASE_PATH}/oauth2/authorization/google`}
            onClick={(event) => onClickedLogin(event)}
          >
            <GoogleLogo
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="46px"
              height="46px"
              viewBox="0 0 46 46"
            >
              <defs>
                <rect
                  id="path-2"
                  width="40"
                  height="40"
                  x="0"
                  y="0"
                  rx="2"
                ></rect>
              </defs>
              <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <g transform="translate(-1 -1)">
                  <g filter="url(#filter-1)" transform="translate(4 4)">
                    <g>
                      <use fill="#FFF" xlinkHref="#path-2"></use>
                      <use xlinkHref="#path-2"></use>
                      <use xlinkHref="#path-2"></use>
                      <use xlinkHref="#path-2"></use>
                    </g>
                  </g>
                  <g transform="translate(15 15)">
                    <path
                      fill="#4285F4"
                      d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                    ></path>
                    <path
                      fill="#EA4335"
                      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                    ></path>
                    <path d="M0 0h18v18H0V0z"></path>
                  </g>
                </g>
              </g>
            </GoogleLogo>
            <GoogleText>Google 계정으로 로그인</GoogleText>
          </LoginGoogleButton>
        </SocialLoginBoxWrapper>
      </ModalWrapper>
    </Wrapper>
  );
}

export default Login;
