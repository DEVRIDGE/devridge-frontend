import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LoginErrorMessage } from "../../constants/enums";

interface IRouteParams {
  error: string;
}

function LoginFailRedirect() {
  const history = useHistory();

  const qs = require("querystring");
  const location = useLocation();
  const params: IRouteParams = qs.parse(location.search.slice(1));

  const errorMessage = params.error;

  useEffect(() => {
    if (errorMessage === LoginErrorMessage.UNMATCHED_EMAIL_AND_PROVIDER) {
      alert("같은 이메일로 가입한 계정이 이미 있습니다.");
    } else if (errorMessage === LoginErrorMessage.UNSUPPORTED_PROVIDER) {
      alert("악의적인 요청 또는 서버 오류로 판단됩니다.");
    } else if (errorMessage === LoginErrorMessage.SERVER_ERROR) {
      alert("서버 오류가 발생하였습니다. 관리자에게 문의해주세요.");
    } else {
      alert("정의되지 않은 오류입니다. 관리자에게 문의해주세요.");
    }
    history.push("/");
  }, []);

  return <div></div>;
}

export default LoginFailRedirect;
