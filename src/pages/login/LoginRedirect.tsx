import { styled } from "styled-components";
import { useEffect } from "react";

import { LoaderWrapper } from "../../components/common/loaderPageWrapper/styles";
import Loader from "../../components/common/loader/Loader";
import { useHistory, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { accessTokenState } from "../../recoil/accessToken/atom";
import { BEFORE_LOGIN_PATH } from "../../constants/constants";
import { isLoginState } from "../../recoil/isLogin/atoms";
import ChannelService from "../../services/ChannelService";
import { IUserInfo } from "../../services/types";
import { getUserInfo } from "../../services/apis";

interface IRouteParams {
  accessToken: string;
  refreshToken: string; //NOTE - 임시
}

const Wrapper = styled.div``;

const OverlayBox = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.textGreyColor};
`;

//TODO - 실패 응답 대응 추가
//TODO - atom은 페이지 옮겼다 돌아오면 증발할듯? 페이지 이동 정보 로컬스토리지나 쿠키에 담는 로직으로 변경하자
//TODO - 리다이렉트 쿼리 스트링 대응 로직 변경

function LoginRedirect() {
  const history = useHistory();

  const setAccessToken = useSetRecoilState(accessTokenState);
  const setIsLogin = useSetRecoilState(isLoginState);

  const qs = require("querystring");
  const location = useLocation();
  const params: IRouteParams = qs.parse(location.search.slice(1));
  const accessToken = params.accessToken;
  const refreshToken = params.refreshToken; //NOTE - 임시

  useEffect(() => {
    const beforeLoginPathOrigin =
      localStorage.getItem(BEFORE_LOGIN_PATH) || "/";
    localStorage.setItem(BEFORE_LOGIN_PATH, "/");
    localStorage.setItem("refreshToken", refreshToken);
    setAccessToken(accessToken);
    setIsLogin(true);

    const channelTalk = new ChannelService();
    let userInfo: IUserInfo;

    const handleGetUserInfo = async () => {
      userInfo = await getUserInfo({ accessToken });
      // const userObject = {
      //   avatarUrl: userInfo.data?.profilePicture,
      //   profile: {
      //     email: userInfo.data?.email,
      //     name: userInfo.data?.name,
      //     provider: userInfo.data?.provider,
      //   },
      // };
      // channelTalk.updateUser(userObject);

      channelTalk.boot({
        pluginKey: "879e637c-369e-44e8-a44e-21b8fd3d0f63",
        memberId: userInfo.data?.email,
        profile: {
          name: userInfo.data?.name,
          avatarUrl: userInfo.data?.profilePicture,
          provider: userInfo.data?.provider,
        },
      });
    };

    handleGetUserInfo();

    history.push(beforeLoginPathOrigin);
  }, []);

  return (
    <Wrapper>
      <OverlayBox />
      <LoaderWrapper>
        <Loader width={100} height={100} />
      </LoaderWrapper>
    </Wrapper>
  );
}

export default LoginRedirect;
