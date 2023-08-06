import Status from "../status/Status";
import { CSButton, Wrapper } from "./styles";

function CSList({ CSName }: { CSName: string }) {
  return (
    <Wrapper>
      <CSButton>
        <Status width="20px" height="20px" />
        {CSName}
      </CSButton>
      <CSButton>
        <Status width="20px" height="20px" />
        {CSName}
      </CSButton>
    </Wrapper>
  );
}

export default CSList;
