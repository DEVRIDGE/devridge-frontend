import { useRecoilValue } from "recoil";
import { StudyStateOption, StudyStateSelect } from "./styles";
import { selectedGridIndexState } from "../../../recoil/selectedGridIndex/atom";

function StudyState() {
  const selectedGridIndex = useRecoilValue(selectedGridIndexState);
  return (
    <StudyStateSelect>
      <StudyStateOption>학습 전</StudyStateOption>
      <StudyStateOption selected={selectedGridIndex === 3}>
        학습 중
      </StudyStateOption>
      <StudyStateOption selected={selectedGridIndex === 1}>
        학습 완료
      </StudyStateOption>
    </StudyStateSelect>
  );
}

export default StudyState;
