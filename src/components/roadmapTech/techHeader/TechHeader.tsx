import { Link } from "react-router-dom";

import CloseButton from "../../common/closeButton/CloseButton";
import StudyState from "../../common/studyState/StudyState";
import { TechTitle, WrapperClose, WrapperTitleAndState } from "./styles";

function TechHeader() {
  return (
    <>
      <WrapperClose>
        <Link to="/roadmap">
          <CloseButton />
        </Link>
      </WrapperClose>
      <WrapperTitleAndState>
        <TechTitle>언어</TechTitle>
        <StudyState />
      </WrapperTitleAndState>
    </>
  );
}

export default TechHeader;
