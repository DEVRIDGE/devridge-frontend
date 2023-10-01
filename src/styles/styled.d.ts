import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    mainColor: string;
    mainColorLight: string;
    textGreyColor: string;
    greyColor: string;
    contentFont: string;
    titleFont: string;
    matchingFlagColor: string;
  }
}
