import { useRecoilValue, useSetRecoilState } from "recoil";

import StudyState from "../../common/studyState/StudyState";
import {
  CloseButton,
  TechTitle,
  WrapperClose,
  WrapperTitleAndState,
} from "./styles";
import {
  SwitchDetail,
  switchRoadmapDetailState,
} from "../../../recoil/swtichRoadmapDetail/atom";
import CloseBtnSvg from "../../common/closeBtnSvg/CloseBtnSvg";
import { techTitleState } from "../../../recoil/techTitle/atom";

function TechHeader() {
  const selectedTechTitle = useRecoilValue(techTitleState);

  const setSwitchDetail = useSetRecoilState(switchRoadmapDetailState);

  const onClickCloseBtn = () => {
    setSwitchDetail(SwitchDetail.BLIND);
  };

  return (
    <>
      <WrapperClose>
        <CloseButton onClick={onClickCloseBtn}>
          <CloseBtnSvg />
        </CloseButton>
      </WrapperClose>
      <WrapperTitleAndState>
        <TechTitle>{selectedTechTitle}</TechTitle>
        <StudyState />
      </WrapperTitleAndState>
    </>
  );
}

export default TechHeader;
