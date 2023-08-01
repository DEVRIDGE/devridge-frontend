import { styled } from "styled-components";

import MainTitle from "../../components/main/mainTitle/MainTitle";
import MainForm from "../../components/main/mainForm/MainForm";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto auto;
  height: 80vh;
`;

function MainPage() {
  return (
    <Wrapper>
      <MainTitle />
      <MainForm />
    </Wrapper>
  );
}

export default MainPage;
