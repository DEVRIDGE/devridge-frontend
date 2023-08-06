import { styled } from "styled-components";
import TechButton from "../../components/roadmapTech/techButton/TechButton";
import TechHeader from "../../components/roadmapTech/techHeader/TechHeader";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

const Overlay = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.textGreyColor};
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
`;

function RoadmapTechPage() {
  return (
    <Wrapper>
      <Overlay />
      <TechMenuWrapper>
        <TechHeader />
        <GridButtons>
          <TechButton />
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
