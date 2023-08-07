import { Link } from "react-router-dom";

import BackButton from "../../common/backButton/BackButton";
import CloseButton from "../../common/closeButton/CloseButton";
import StudyState from "../../common/studyState/StudyState";
import { CoursePageTitle, WrapperClose, WrapperTitleAndState } from "./styles";

function CourseHeader() {
  return (
    <>
      <WrapperClose>
        <Link to="/roadmap/tmp">
          <BackButton />
        </Link>
        <Link to="/roadmap">
          <CloseButton />
        </Link>
      </WrapperClose>
      <WrapperTitleAndState>
        <CoursePageTitle>{"언어 > Python"}</CoursePageTitle>
        <StudyState />
      </WrapperTitleAndState>
    </>
  );
}

export default CourseHeader;
