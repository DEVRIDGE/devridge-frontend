import { Route, Switch } from "react-router-dom";

import MainPage from "./pages/main/MainPage";
import RoadmapPage from "./pages/roadmap/RoadmapPage";
import Header from "./components/common/header/Header";
import MenuMobile from "./pages/menuMobile/MenuMobile";
import LoginRedirect from "./pages/login/LoginRedirect";
import LoginFailRedirect from "./pages/login/LoginFailRedirect";

function Router() {
  return (
    <Switch>
      <Route path="/loginFailRedirectPage">
        <LoginFailRedirect />
      </Route>
      <Route path="/loginRedirectPage">
        <LoginRedirect />
      </Route>
      <Route path="/menuMobile">
        <MenuMobile />
      </Route>
      <Route path="/roadmap">
        <Header />
        <RoadmapPage />
      </Route>
      <Route path="/">
        <Header />
        <MainPage />
      </Route>
    </Switch>
  );
}

export default Router;
