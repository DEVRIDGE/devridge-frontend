import { styled } from "styled-components";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import MainTitle from "../../components/main/mainTitle/MainTitle";
import MainForm from "../../components/main/mainForm/MainForm";
import Footer from "../../components/common/footer/Footer";
import {
  getApplyRefreshToken,
  getCompanies,
  getJobs,
  getRoadmap,
} from "../../services/apis";
import { ICompanies, IJobs } from "../../services/types";
import { switchLoginState } from "../../recoil/switchLogin/atom";
import Login from "../login/Login";
import { accessTokenState } from "../../recoil/accessToken/atom";
import issueNewAccessTokenHook from "../../hooks/issueNewAccessTokenHook";
import { isJobDropdownOptionsState } from "../../recoil/isJobDropdownOptions/atoms";
import { isCompanyDropdownOptionsState } from "../../recoil/isCompanyDropdownOptions/atoms";
import { companyState } from "../../recoil/companyId/atom";

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding-top: 50px;
  height: 100%;
`;

function MainPage() {
  //NOTE - 테스트용
  const accessToken = useRecoilValue(accessTokenState);
  const history = useHistory();
  const setAccessToken = useSetRecoilState(accessTokenState);
  const onClickTestIssueNewAccessToken = async () => {
    const newAccessToken: string = await issueNewAccessTokenHook();

    if (newAccessToken === "/") {
      history.push("/");
    } else {
      setAccessToken(newAccessToken);
    }
  };

  //NOTE - 로그인 모달 창 스위칭 atom
  const [switchLogin, setSwitchLogin] = useRecoilState(switchLoginState);

  const setIsJobDropdownOptions = useSetRecoilState(isJobDropdownOptionsState);
  const setIsCompanyDropdownOptions = useSetRecoilState(
    isCompanyDropdownOptionsState
  );

  const onToggleDropdown = () => {
    setIsJobDropdownOptions(false);
    setIsCompanyDropdownOptions(false);
  };

  useEffect(() => {
    setSwitchLogin(false);
  }, []);

  return (
    <Wrapper onClick={onToggleDropdown}>
      <MainTitle />
      <MainForm />
      {/* <button
        onClick={async () => {
          const data: any = await getApplyRefreshToken();
          console.log(data);
        }}
        style={{
          width: "100px",
          height: "50px",
          position: "absolute",
          top: "70px",
        }}
      >
        리프레시 토큰 쿠키 테스트
      </button>
      <button
        onClick={onClickTestIssueNewAccessToken}
        style={{
          width: "100px",
          height: "50px",
          position: "absolute",
          top: "130px",
        }}
      >
        엑세스 토큰 재발급 테스트
      </button>
      <button
        onClick={async () => {
          const data = await getRoadmap({
            jobId: 1,
            companyId: 1,
            detailedPosition: 1,
            accessToken,
          });
          console.log(data);
        }}
        style={{
          width: "100px",
          height: "80px",
          position: "absolute",
          top: "190px",
        }}
      >
        로드맵 API에 엑세스 토큰 담아서 보내기 테스트
      </button> */}
      <Footer />
      {switchLogin ? <Login beforeLoginPath="/" /> : null}
    </Wrapper>
  );
}

export default MainPage;
