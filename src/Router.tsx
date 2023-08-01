import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import Header from "./components/common/header/Header";
import { styled } from "styled-components";

const Wrapper = styled.div`
  padding: 0 15vw;
`;

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Wrapper>
        <Header />
        <Switch>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}

export default Router;
