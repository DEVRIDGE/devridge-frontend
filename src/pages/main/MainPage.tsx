import { styled } from "styled-components";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import MainTitle from "../../components/main/mainTitle/MainTitle";
import MainForm from "../../components/main/mainForm/MainForm";
import Footer from "../../components/common/footer/Footer";
import { switchLoginState } from "../../recoil/switchLogin/atom";
import Login from "../login/Login";
import { accessTokenState } from "../../recoil/accessToken/atom";
import issueNewAccessTokenHook from "../../utils/issueNewAccessTokenHook";
import { isJobDropdownOptionsState } from "../../recoil/isJobDropdownOptions/atoms";
import { isCompanyDropdownOptionsState } from "../../recoil/isCompanyDropdownOptions/atoms";
import useOnClickedProfileOuter from "../../hooks/useOnClickedProfileOuter";
import { isLoginState } from "../../recoil/isLogin/atoms";
import ChannelService from "../../services/ChannelService";
import { IUserInfo } from "../../services/types";
import { getUserInfo } from "../../services/apis";
import { userInfoState } from "../../recoil/userInfo/atoms";

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding-top: 50px;
  height: 100%;
`;

function MainPage() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const history = useHistory();

  //NOTE - 로그인 모달 창 스위칭 atom
  const [switchLogin, setSwitchLogin] = useRecoilState(switchLoginState);

  const setIsJobDropdownOptions = useSetRecoilState(isJobDropdownOptionsState);
  const setIsCompanyDropdownOptions = useSetRecoilState(
    isCompanyDropdownOptionsState
  );
  const setIsLogin = useSetRecoilState(isLoginState);

  const setUserInfo = useSetRecoilState(userInfoState);

  const onClickedProfileOuter = useOnClickedProfileOuter();

  const onClickedWrapper = () => {
    setIsJobDropdownOptions(false);
    setIsCompanyDropdownOptions(false);
    onClickedProfileOuter();
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
        if (newAccessToken !== null) {
          const userInfo: IUserInfo = await getUserInfo({
            accessToken: newAccessToken,
          });
          setUserInfo(userInfo.data);
        }
      }
      return;
    };

    if (!accessToken && localStorage.getItem("refreshToken")) {
      handleRefreshPageIssueToken();
    }
  }, []);

  return (
    <Wrapper onClick={onClickedWrapper}>
      <MainTitle />
      <MainForm />
      <Footer />
      {switchLogin ? <Login beforeLoginPath="/" /> : null}
    </Wrapper>
  );
}

export default MainPage;
