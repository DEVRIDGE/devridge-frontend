import { styled } from "styled-components";

import RoadmapTitle from "../../components/roadmap/roadmapTitle/RoadmapTitle";
import Road from "../../components/roadmap/road/Road";
import Footer from "../../components/common/footer/Footer";

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding-top: 50px;
  padding-bottom: 100px;
`;

function RoadmapPage() {
  return (
    <Wrapper>
      <RoadmapTitle />
      <Road />
      <Footer />
    </Wrapper>
  );
}

export default RoadmapPage;
