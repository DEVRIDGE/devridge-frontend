import { styled } from "styled-components";

import Header from "../../components/common/header/Header";
import RoadmapTitle from "../../components/roadmap/roadmapTitle/RoadmapTitle";
import Road from "../../components/roadmap/road/Road";

const Wrapper = styled.div``;

function RoadmapPage() {
  return (
    <Wrapper>
      <Header />
      <RoadmapTitle />
      <Road />
    </Wrapper>
  );
}

export default RoadmapPage;
