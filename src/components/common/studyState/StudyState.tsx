import { StudyStateOption, StudyStateSelect } from "./styles";

function StudyState() {
  return (
    <StudyStateSelect>
      <StudyStateOption>학습 전</StudyStateOption>
      <StudyStateOption>학습 중</StudyStateOption>
      <StudyStateOption>학습 완료</StudyStateOption>
    </StudyStateSelect>
  );
}

export default StudyState;
