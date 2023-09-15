import Status from "../status/Status";
import { TechName, Wrapper } from "./styles";

interface ITech {
  techName: string;
  marginBottom?: string;
  $checkerType?: number;
  $matchingFlag: string;
}

function Tech({ techName, marginBottom, $checkerType, $matchingFlag }: ITech) {
  return (
    <Wrapper style={{ marginBottom }}>
      <Status $checkerType={$checkerType} $matchingFlag={$matchingFlag} />
      <TechName>{techName}</TechName>
    </Wrapper>
  );
}

export default Tech;
