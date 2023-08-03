import { BrowserRouter, Route, Switch } from "react-router-dom";

import MainPage from "./pages/main/MainPage";
import RoadmapPage from "./pages/roadmap/RoadmapPage";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/roadmap">
          <RoadmapPage />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
