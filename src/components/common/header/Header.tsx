import { Link } from "react-router-dom";
import { Col, Item, Items, LoginButton, Logo, Nav } from "./styles";

function Header() {
  return (
    <Nav>
      <Col>
        <Link to="/">
          <Logo
            width="167"
            height="23"
            viewBox="0 0 167 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.71 22V0.999999H11.06C13.4 0.999999 15.46 1.43 17.24 2.29C19.02 3.13 20.41 4.33 21.41 5.89C22.41 7.45 22.91 9.31 22.91 11.47C22.91 13.65 22.41 15.53 21.41 17.11C20.41 18.67 19.02 19.88 17.24 20.74C15.46 21.58 13.4 22 11.06 22H0.71ZM7.79 16.48H10.76C11.76 16.48 12.63 16.29 13.37 15.91C14.13 15.53 14.72 14.97 15.14 14.23C15.56 13.47 15.77 12.55 15.77 11.47C15.77 10.41 15.56 9.51 15.14 8.77C14.72 8.03 14.13 7.47 13.37 7.09C12.63 6.71 11.76 6.52 10.76 6.52H7.79V16.48ZM31.9752 8.8H41.3352V13.9H31.9752V8.8ZM32.4552 16.66H42.9552V22H25.4952V0.999999H42.5652V6.34H32.4552V16.66ZM51.9877 22L43.1077 0.999999H50.7277L57.9577 18.73H53.4277L60.8677 0.999999H67.8277L58.9477 22H51.9877ZM68.5323 22V0.999999H78.6423C80.6023 0.999999 82.2923 1.32 83.7123 1.96C85.1523 2.6 86.2623 3.52 87.0423 4.72C87.8223 5.9 88.2123 7.3 88.2123 8.92C88.2123 10.54 87.8223 11.94 87.0423 13.12C86.2623 14.28 85.1523 15.17 83.7123 15.79C82.2923 16.41 80.6023 16.72 78.6423 16.72H72.4623L75.6123 13.81V22H68.5323ZM81.1023 22L75.9423 14.35H83.4423L88.6623 22H81.1023ZM75.6123 14.59L72.4623 11.38H78.1923C79.1723 11.38 79.8923 11.16 80.3523 10.72C80.8323 10.28 81.0723 9.68 81.0723 8.92C81.0723 8.16 80.8323 7.56 80.3523 7.12C79.8923 6.68 79.1723 6.46 78.1923 6.46H72.4623L75.6123 3.25V14.59ZM90.8858 22V0.999999H97.9658V22H90.8858ZM101.374 22V0.999999H111.724C114.064 0.999999 116.124 1.43 117.904 2.29C119.684 3.13 121.074 4.33 122.074 5.89C123.074 7.45 123.574 9.31 123.574 11.47C123.574 13.65 123.074 15.53 122.074 17.11C121.074 18.67 119.684 19.88 117.904 20.74C116.124 21.58 114.064 22 111.724 22H101.374ZM108.454 16.48H111.424C112.424 16.48 113.294 16.29 114.034 15.91C114.794 15.53 115.384 14.97 115.804 14.23C116.224 13.47 116.434 12.55 116.434 11.47C116.434 10.41 116.224 9.51 115.804 8.77C115.384 8.03 114.794 7.47 114.034 7.09C113.294 6.71 112.424 6.52 111.424 6.52H108.454V16.48ZM137.049 22.48C135.349 22.48 133.779 22.22 132.339 21.7C130.919 21.16 129.679 20.4 128.619 19.42C127.579 18.44 126.769 17.28 126.189 15.94C125.609 14.6 125.319 13.12 125.319 11.5C125.319 9.88 125.609 8.4 126.189 7.06C126.769 5.72 127.589 4.56 128.649 3.58C129.709 2.6 130.959 1.85 132.399 1.33C133.859 0.789999 135.459 0.519999 137.199 0.519999C139.279 0.519999 141.129 0.869999 142.749 1.57C144.389 2.27 145.739 3.27 146.799 4.57L142.269 8.56C141.609 7.8 140.889 7.23 140.109 6.85C139.349 6.45 138.499 6.25 137.559 6.25C136.779 6.25 136.069 6.37 135.429 6.61C134.809 6.85 134.279 7.2 133.839 7.66C133.399 8.12 133.059 8.67 132.819 9.31C132.579 9.95 132.459 10.68 132.459 11.5C132.459 12.28 132.579 13 132.819 13.66C133.059 14.3 133.399 14.85 133.839 15.31C134.279 15.77 134.799 16.13 135.399 16.39C136.019 16.63 136.709 16.75 137.469 16.75C138.269 16.75 139.049 16.62 139.809 16.36C140.569 16.08 141.379 15.61 142.239 14.95L146.199 19.81C144.919 20.67 143.459 21.33 141.819 21.79C140.179 22.25 138.589 22.48 137.049 22.48ZM140.049 18.91V10.93H146.199V19.81L140.049 18.91ZM155.696 8.8H165.056V13.9H155.696V8.8ZM156.176 16.66H166.676V22H149.216V0.999999H166.286V6.34H156.176V16.66Z"
              fill="#272727"
            />
          </Logo>
        </Link>

        <Items>
          <Item>공지사항</Item>
          <Item>이벤트</Item>
        </Items>
      </Col>
      <Col>
        <LoginButton>Login</LoginButton>
      </Col>
    </Nav>
  );
}

export default Header;
