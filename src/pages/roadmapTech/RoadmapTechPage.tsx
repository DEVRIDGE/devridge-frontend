import { styled } from "styled-components";
import TechButton from "../../components/roadmapTech/techButton/TechButton";
import TechHeader from "../../components/roadmapTech/techHeader/TechHeader";
import { Link } from "react-router-dom";
import Overlay from "../../components/common/overlay/Overlay";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

const TechMenuWrapper = styled.div`
  position: fixed;
  top: 50px;
  right: 20px;
  bottom: 0;
  margin: auto auto;
  padding: 20px;
  width: 40vw;
  height: 90vh;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColor};
`;

const GridButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  justify-items: center;
  gap: 10px;
  margin-top: 50px;

  a {
    width: 100%;
  }
`;

function RoadmapTechPage() {
  return (
    <Wrapper>
      <Overlay />
      <TechMenuWrapper>
        <TechHeader />
        <GridButtons>
          <Link to="/roadmap/tmp/tmp2">
            <TechButton />
          </Link>
          <TechButton />
          <TechButton />
          <TechButton />
          <TechButton />
          <TechButton />
        </GridButtons>
      </TechMenuWrapper>
    </Wrapper>
  );
}

export default RoadmapTechPage;
