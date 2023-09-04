import { BrowserRouter, Route, Switch } from "react-router-dom";

import MainPage from "./pages/main/MainPage";
import RoadmapPage from "./pages/roadmap/RoadmapPage";
import Header from "./components/common/header/Header";
import MenuMobile from "./pages/menuMobile/MenuMobile";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/menu_mobile">
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
    </BrowserRouter>
  );
}

export default Router;
