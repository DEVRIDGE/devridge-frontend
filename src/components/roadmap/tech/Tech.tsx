import { Link } from "react-router-dom";

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
      <Link to="/roadmap/tmp">
        <Status $checkerType={$checkerType} />
      </Link>
      <Link to="/roadmap/tmp">
        <TechName>{techName}</TechName>
      </Link>
    </Wrapper>
  );
}

export default Tech;
