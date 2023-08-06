import { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";

import Router from "./Router";
import { isDarkState } from "./recoil/darkMode/atom";
import { GlobalStyle } from "./styles/GlobalStyle";
import { darkTheme, lightTheme } from "./styles/theme";
import useDynamicScroll from "./hooks/useDynamicScroll";

function App() {
  const isDark = useRecoilValue(isDarkState);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
