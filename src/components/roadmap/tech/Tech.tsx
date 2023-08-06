import Status from "../status/Status";
import { TechName, Wrapper } from "./styles";

interface ITech {
  techName: string;
  marginBottom?: string;
  $checkerType?: number;
}

function Tech({ techName, marginBottom, $checkerType }: ITech) {
  return (
    <Wrapper style={{ marginBottom }}>
      <Status $checkerType={$checkerType} />
      <TechName>{techName}</TechName>
    </Wrapper>
  );
}

export default Tech;
