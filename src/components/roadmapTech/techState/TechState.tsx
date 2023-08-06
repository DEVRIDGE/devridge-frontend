import { TechStateOption, TechStateSelect } from "./styles";

function TechState() {
  return (
    <TechStateSelect>
      <TechStateOption>학습 전</TechStateOption>
      <TechStateOption>학습 중</TechStateOption>
      <TechStateOption>학습 완료</TechStateOption>
    </TechStateSelect>
  );
}

export default TechState;
