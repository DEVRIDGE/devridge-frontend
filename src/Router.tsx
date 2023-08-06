import { BrowserRouter, Route, Switch } from "react-router-dom";

import MainPage from "./pages/main/MainPage";
import RoadmapPage from "./pages/roadmap/RoadmapPage";
import Header from "./components/common/header/Header";
import RoadmapTechPage from "./pages/roadmapTech/RoadmapTechPage";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <Route path="/roadmap">
          <RoadmapPage />
        </Route>
        <Route path={["/", "/roadmap/tmp"]}>
          <MainPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
