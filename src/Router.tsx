import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./pages/main/MainPage";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
