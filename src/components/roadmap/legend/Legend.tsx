import { FlagDescriptionIcon, LegendText, LegendWrapper } from "./styles";

function Legend() {
  return (
    <LegendWrapper>
      {/* <LegendIconBox />
      <LegendIconSeparate>/</LegendIconSeparate>
      <LegendIconCircle /> */}
      <FlagDescriptionIcon
        width="31"
        height="49"
        viewBox="0 0 31 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.5"
          y1="2.09082e-08"
          x2="0.499998"
          y2="49"
          stroke="#676767"
        />
        <path
          d="M20.7128 4.18364C17.319 4.18364 14.5161 2.00557 10.2493 2.00557C8.66882 2.00557 7.2531 2.28009 5.93986 2.75781C6.50519 2.56695 5.93986 2.75781 5.02886 2.96728C3.03558 2.96766 5.02886 2.96728 3.29748 2.96766C1.3177 2.96766 3.29748 2.96766 0.600791 2.96766C0.600791 4.15904 0.600329 3.37435 0.600791 4.38164V22.6447C2.04793 22.6447 1.28963 22.6447 2.12909 22.6447H3.38707C4.22653 22.6447 4.65403 22.6447 4.39396 22.6447H4.65403C6.44702 21.8893 8.68079 21.2594 11.9014 21.2594C15.2952 21.2594 18.098 23.4375 22.3649 23.4375C25.4155 23.4375 27.8537 22.4172 30.1234 20.879C30.6733 20.5064 31.0001 19.8876 31.0001 19.2285V4.00593C31.0001 2.54109 29.4631 1.57194 28.1194 2.18898C25.9447 3.18763 23.2775 4.18364 20.7128 4.18364Z"
          fill="#FF0000"
        />
      </FlagDescriptionIcon>
      <LegendText>: 선택한 회사의 채용 정보가 반영된 항목</LegendText>
    </LegendWrapper>
  );
}

export default Legend;
