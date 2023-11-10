import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { StudyStateOption, StudyStateSelect } from "./styles";
import { selectedRoadmapIndexState } from "../../../recoil/selectedRoadmapIndex/atoms";
import { roadmapStudyStatusCodesState } from "../../../recoil/roadmapStudyStatusCodes/atoms";
import { selectedTechIdState } from "../../../recoil/selectedTechId/atom";
import { companyState } from "../../../recoil/companyId/atom";
import { jobState } from "../../../recoil/jobId/atom";
import { selectedDetailedPositionState } from "../../../recoil/selectedDetailedPosition/atom";
import { postStudyStatus } from "../../../services/apis";
import { accessTokenState } from "../../../recoil/accessToken/atom";
import { IStudyStatusResponse } from "../../../services/types";
import {
  ApiMessage,
  ApiStatus,
  StudyStatusMessage,
} from "../../../constants/enums";
import { isLoginState } from "../../../recoil/isLogin/atoms";
import { useHistory } from "react-router-dom";
import issueNewAccessTokenHook from "../../../utils/issueNewAccessTokenHook";

interface IOnChange {
  event: any;
  accessToken: string | null;
  recursionCount: number;
}

function StudyState() {
  const history = useHistory();

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const selectedRoadmapIndex = useRecoilValue(selectedRoadmapIndexState);
  const selectedTechId = useRecoilValue(selectedTechIdState);
  const companyId = useRecoilValue(companyState);
  const jobId = useRecoilValue(jobState);
  const selectedDetailedPosition = useRecoilValue(
    selectedDetailedPositionState
  );

  const setIsLogin = useSetRecoilState(isLoginState);

  const [roadmapStudyStatusCodes, setRoadmapStudyStatusCodes] = useRecoilState(
    roadmapStudyStatusCodesState
  );

  const onChange = async ({
    event,
    accessToken,
    recursionCount,
  }: IOnChange) => {
    if (recursionCount > 3) {
      alert("과도한 통신량 발생. 관리자에게 문의해주세요.");
      setIsLogin(false);
      setAccessToken(null);
      localStorage.removeItem("refreshToken");
      history.push("/");
      return;
    }

    const postStudyStatusApiResponse: IStudyStatusResponse =
      await postStudyStatus({
        accessToken,
        selectedTechId,
        studyStatus:
          +event.target.value === 2
            ? StudyStatusMessage.STUDY_END
            : +event.target.value === 1
            ? StudyStatusMessage.STUDYING
            : StudyStatusMessage.BEFORE_STUDYING,
        companyId,
        jobId,
        detailedPosition: selectedDetailedPosition,
      });

    if (postStudyStatusApiResponse.status === ApiStatus.error) {
      if (postStudyStatusApiResponse.message === ApiMessage.login_required) {
        alert("로그인이 필요한 서비스입니다.");
        setIsLogin(false);
        setAccessToken(null);
        localStorage.removeItem("refreshToken");
        history.push("/");
        return;
      } else {
        const newAccessToken: string | null = await issueNewAccessTokenHook();

        if (newAccessToken === "/") {
          setIsLogin(false);
          setAccessToken(null);
          history.push("/");
          return;
        } else {
          setAccessToken(newAccessToken);
          onChange({
            event: event,
            accessToken: newAccessToken,
            recursionCount: recursionCount + 1,
          });
          return;
        }
      }
    } else {
      const newRoadmapStudyStatusCodes = JSON.parse(
        JSON.stringify(roadmapStudyStatusCodes)
      );
      newRoadmapStudyStatusCodes[selectedRoadmapIndex][selectedTechId] =
        +event.target.value;
      setRoadmapStudyStatusCodes(newRoadmapStudyStatusCodes);
      return;
    }
  };

  return (
    <StudyStateSelect
      onChange={(event) => onChange({ event, accessToken, recursionCount: 0 })}
      defaultValue={
        roadmapStudyStatusCodes[selectedRoadmapIndex][selectedTechId]
      }
    >
      <StudyStateOption value={0}>학습 전</StudyStateOption>
      <StudyStateOption value={1}>학습 중</StudyStateOption>
      <StudyStateOption value={2}>학습 완료</StudyStateOption>
    </StudyStateSelect>
  );
}

export default StudyState;
