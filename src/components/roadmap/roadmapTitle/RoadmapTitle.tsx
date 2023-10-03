import { Company, Job, Wrapper } from "./styles";

interface IRoadmapTitle {
  $jobName: string;
  $companyName: string;
}

function RoadmapTitle({ $jobName, $companyName }: IRoadmapTitle) {
  //TODO - 메인 페이지에서 고른 직무, 회사명 적용하기
  return (
    <Wrapper>
      <Company>{$companyName}</Company>
      <Job>{$jobName}</Job>
    </Wrapper>
  );
}

export default RoadmapTitle;
