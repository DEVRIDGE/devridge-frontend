import Status from "../status/Status";
import { TechName, Wrapper } from "./styles";

interface ITech {
  techName: string;
  marginBottom?: string;
  $studyStatusCode?: number;
}

function Tech({ techName, marginBottom, $studyStatusCode }: ITech) {
  return (
    <Wrapper style={{ marginBottom }}>
      <Status $studyStatusCode={$studyStatusCode} />
      <TechName>{techName}</TechName>
    </Wrapper>
  );
}

export default Tech;
