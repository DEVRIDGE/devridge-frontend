import { styled } from "styled-components";

import MainTitle from "../../components/main/mainTitle/MainTitle";
import MainForm from "../../components/main/mainForm/MainForm";
import Footer from "../../components/common/footer/Footer";
import { useQuery } from "react-query";
import { getJobs } from "../../services/apis";
import { IJobs } from "../../services/types";

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding-top: 50px;
  height: 100%;
`;

function MainPage() {
  const { isLoading, data } = useQuery<IJobs>("jobs", getJobs);
  if (!isLoading) {
    console.log(data?.data.jobs);
  }

  return (
    <Wrapper>
      <MainTitle />
      <MainForm />
      <Footer />
    </Wrapper>
  );
}

export default MainPage;
