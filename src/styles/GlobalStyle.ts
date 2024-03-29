import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@font-face {
	font-family: "pretendard-medium";
	src: url(${`${process.env.PUBLIC_URL}/fonts/Pretendard-Medium.woff`});
}
@font-face {
	font-family: "pretendard-regular";
	src: url(${`${process.env.PUBLIC_URL}/fonts/Pretendard-Regular.woff`});
}
@font-face {
	font-family: "pretendard-bold";
	src: url(${`${process.env.PUBLIC_URL}/fonts/Pretendard-Bold.woff`});
}
@font-face {
	font-family: "pretendard-extrabold";
	src: url(${`${process.env.PUBLIC_URL}/fonts/Pretendard-ExtraBold.woff`});
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	box-sizing: border-box;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
html {
	height: 100%;
}
body {
	height: 100%;
	background-color: ${(props) => props.theme.bgColor};
	line-height: 1;
	font-family: ${(props) => props.theme.contentFont};
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}`;
