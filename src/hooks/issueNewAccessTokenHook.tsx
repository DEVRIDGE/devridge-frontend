import { getNewAccessToken } from "../services/apis";
import { INewAccessToken } from "../services/types";
import { ApiStatus, ErrorMessageNewAccessToken } from "../constants/enums";

async function issueNewAccessTokenHook() {
  const refreshToken = localStorage.getItem("refreshToken");

  const response: INewAccessToken = await getNewAccessToken({
    refreshToken,
  });

  if (response.status === ApiStatus.error) {
    if (response.message === ErrorMessageNewAccessToken.verification) {
      alert("잘못된 토큰입니다. 다시 로그인 해주세요.");
    } else if (response.message === ErrorMessageNewAccessToken.expired) {
      alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
    } else {
      alert("예기치 않은 오류입니다. 다시 로그인 해주세요.");
    }
    return "/";
  }

  return response.data!.accessToken;
}

export default issueNewAccessTokenHook;
