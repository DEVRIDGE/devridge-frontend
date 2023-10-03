import {
  LegendIconBox,
  LegendIconCircle,
  LegendIconSeparate,
  LegendText,
  LegendWrapper,
} from "./styles";

function Legend() {
  return (
    <LegendWrapper>
      <LegendIconBox />
      <LegendIconSeparate>/</LegendIconSeparate>
      <LegendIconCircle />
      <LegendText>: 선택한 회사의 채용 정보가 반영된 항목</LegendText>
    </LegendWrapper>
  );
}

export default Legend;
