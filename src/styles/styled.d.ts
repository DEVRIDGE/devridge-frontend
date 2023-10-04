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
    pretendardRegular: string;
    pretendardBold: string;
    pretendardExtraBold: string;
    titleFont: string;
    matchingFlagColor: string;
  }
}
