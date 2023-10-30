import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactGA from "react-ga4";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize("G-LJFNNS7K3Y");
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const rootStyle = document.getElementById("root");
rootStyle!.style.height = "100%";

const queryClient = new QueryClient();

root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        basename={
          process.env.NODE_ENV === "development" ? process.env.PUBLIC_URL : "/"
        }
      >
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </RecoilRoot>
);
