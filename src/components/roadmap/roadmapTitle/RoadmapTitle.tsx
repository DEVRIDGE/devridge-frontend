import { Company, Job, Wrapper } from "./styles";

interface IRoadmapTitle {
  $jobName: string;
  $companyName: string;
}

function RoadmapTitle({ $jobName, $companyName }: IRoadmapTitle) {
  return (
    <Wrapper>
      <Company>{$companyName}</Company>
      <Job>{$jobName}</Job>
    </Wrapper>
  );
}

export default RoadmapTitle;
