import { useRecoilValue, useSetRecoilState } from "recoil";

import BackBtnSvg from "../../common/backBtnSvg/BackBtnSvg";
import {
  BackButton,
  CloseButton,
  CoursePageTitle,
  WrapperClose,
  WrapperTitleAndState,
} from "./styles";
import CloseBtnSvg from "../../common/closeBtnSvg/CloseBtnSvg";
import { switchRoadmapDetailState } from "../../../recoil/swtichRoadmapDetail/atom";
import { courseTitleState } from "../../../recoil/courseTitle/atom";
import { SwitchDetail } from "../../../constants/enums";

function CourseHeader() {
  const selectedCourseTitle = useRecoilValue(courseTitleState);

  const setSwitchRoadmapDetail = useSetRecoilState(switchRoadmapDetailState);

  const onClickBackButton = () => {
    setSwitchRoadmapDetail(SwitchDetail.TECH);
  };

  const onClickCloseButton = () => {
    setSwitchRoadmapDetail(SwitchDetail.BLIND);
  };

  return (
    <>
      <WrapperClose>
        <BackButton onClick={onClickBackButton}>
          <BackBtnSvg />
        </BackButton>
        <CloseButton onClick={onClickCloseButton}>
          <CloseBtnSvg />
        </CloseButton>
      </WrapperClose>
      <WrapperTitleAndState>
        <CoursePageTitle>{selectedCourseTitle}</CoursePageTitle>
      </WrapperTitleAndState>
    </>
  );
}

export default CourseHeader;
