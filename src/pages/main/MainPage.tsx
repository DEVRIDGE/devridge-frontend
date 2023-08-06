import { styled } from "styled-components";

import MainTitle from "../../components/main/mainTitle/MainTitle";
import MainForm from "../../components/main/mainForm/MainForm";
import Footer from "../../components/common/footer/Footer";

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding-top: 50px;
  height: 100%;
`;

function MainPage() {
  return (
    <Wrapper>
      <MainTitle />
      <MainForm />
      <Footer />
    </Wrapper>
  );
}

export default MainPage;
