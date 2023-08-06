import CloseButton from "../../common/closeButton/CloseButton";
import TechState from "../techState/TechState";
import { TechTitle, WrapperClose, WrapperTitleAndState } from "./styles";

function TechHeader() {
  return (
    <>
      <WrapperClose>
        <CloseButton />
      </WrapperClose>
      <WrapperTitleAndState>
        <TechTitle>언어</TechTitle>
        <TechState />
      </WrapperTitleAndState>
    </>
  );
}

export default TechHeader;
