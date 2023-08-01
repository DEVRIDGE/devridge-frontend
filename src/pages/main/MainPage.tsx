import { styled } from "styled-components";

import MainTitle from "../../components/main/mainTitle/MainTitle";
import MainForm from "../../components/main/mainForm/MainForm";
import Footer from "../../components/common/footer/Footer";
import Header from "../../components/common/header/Header";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

function MainPage() {
  return (
    <Wrapper>
      <Header />
      <MainTitle />
      <MainForm />
      <Footer />
    </Wrapper>
  );
}

export default MainPage;
