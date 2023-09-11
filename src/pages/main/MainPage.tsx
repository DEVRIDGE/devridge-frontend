import { styled } from "styled-components";
import { useQuery } from "react-query";
import { useEffect } from "react";

import MainTitle from "../../components/main/mainTitle/MainTitle";
import MainForm from "../../components/main/mainForm/MainForm";
import Footer from "../../components/common/footer/Footer";
import { getCompanies, getJobs } from "../../services/apis";
import { ICompanies, IJobs } from "../../services/types";
import { useRecoilState, useRecoilValue } from "recoil";
import { switchLoginState } from "../../recoil/switchLogin/atom";
import Login from "../login/Login";
import { Link } from "react-router-dom";
import { accessTokenState } from "../../recoil/accessToken/atom";

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding-top: 50px;
  height: 100%;
`;

function MainPage() {
  //NOTE - job, company 드롭다운 api 호출
  const accessToken = useRecoilValue(accessTokenState);
  const { isLoading: isJobsLoading, data: jobsApiData } = useQuery<IJobs>(
    "jobs",
    () => getJobs(accessToken)
  );
  const { isLoading: isCompaniesLoading, data: companiesApiData } =
    useQuery<ICompanies>("companies", getCompanies);

  const isLoading = isJobsLoading || isCompaniesLoading;

  //NOTE - 로그인 모달 창 스위칭 atom
  const [switchLogin, setSwitchLogin] = useRecoilState(switchLoginState);
  console.log(process.env.NODE_ENV);
  useEffect(() => {
    setSwitchLogin(false);
  }, []);

  return (
    <Wrapper>
      <MainTitle />
      <MainForm
        isLoading={isLoading}
        jobsApiData={jobsApiData}
        companiesApiData={companiesApiData}
      />
      <Link to="/loginFailRedirectPage">asdasd</Link>
      <Footer />
      {switchLogin ? <Login beforeLoginPath="/" /> : null}
    </Wrapper>
  );
}

export default MainPage;
