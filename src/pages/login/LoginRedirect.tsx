import { styled } from "styled-components";
import { useEffect } from "react";

import { LoaderWrapper } from "../../components/common/loaderPageWrapper/styles";
import Loader from "../../components/common/loader/Loader";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { afterLoginState } from "../../recoil/afterLogin/atom";
import { accessTokenState } from "../../recoil/accessToken/atom";
import { BEFORE_LOGIN_PATH } from "../../constants/constants";

interface IRouteParams {
  accessToken: string;
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

  const qs = require("querystring");
  const location = useLocation();
  const params: IRouteParams = qs.parse(location.search.slice(1));
  const accessToken = params.accessToken;

  useEffect(() => {
    const beforeLoginPathOrigin =
      localStorage.getItem(BEFORE_LOGIN_PATH) || "/";
    localStorage.setItem(BEFORE_LOGIN_PATH, "/");
    setAccessToken(accessToken);
    console.log(accessToken);
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
