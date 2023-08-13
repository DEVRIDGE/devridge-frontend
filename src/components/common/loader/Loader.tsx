import { Oval } from "react-loader-spinner";
import { useTheme } from "styled-components";

interface ILoader {
  width?: number;
  height?: number;
  strokeWidth?: number;
  strokeWidthSecondary?: number;
}

function Loader(props: ILoader) {
  const theme = useTheme();
  return (
    <Oval
      color={theme.mainColor}
      secondaryColor={theme.greyColor}
      strokeWidth={props.strokeWidth ?? 5}
      strokeWidthSecondary={props.strokeWidthSecondary ?? 5}
      height={props.height ?? 30}
      width={props.width ?? 30}
    />
  );
}

export default Loader;
