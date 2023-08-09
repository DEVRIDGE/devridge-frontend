import { styled } from "styled-components";

import MainTitle from "../../components/main/mainTitle/MainTitle";
import MainForm from "../../components/main/mainForm/MainForm";
import Footer from "../../components/common/footer/Footer";
import { useQuery } from "react-query";
import { getCompanies, getJobs } from "../../services/apis";
import { ICompanies, IJobs } from "../../services/types";

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding-top: 50px;
  height: 100%;
`;

function MainPage() {
  const { isLoading: isJobsLoading, data: jobsApiData } = useQuery<IJobs>(
    "jobs",
    getJobs
  );
  const { isLoading: isCompaniesLoading, data: companiesApiData } =
    useQuery<ICompanies>("companies", getCompanies);
  const isLoading = isJobsLoading || isCompaniesLoading;

  return (
    <Wrapper>
      <MainTitle />
      <MainForm
        isLoading={isLoading}
        jobsApiData={jobsApiData}
        companiesApiData={companiesApiData}
      />
      <Footer />
    </Wrapper>
  );
}

export default MainPage;
