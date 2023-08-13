import { styled } from "styled-components";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

import RoadmapTitle from "../../components/roadmap/roadmapTitle/RoadmapTitle";
import Road from "../../components/roadmap/road/Road";
import Footer from "../../components/common/footer/Footer";
import { getRoadmap } from "../../services/apis";
import { IRoadmap } from "../../services/types";
import Overlay from "../../components/common/overlay/Overlay";
import Loader from "../../components/common/loader/Loader";
import { jobState } from "../../recoil/jobId/atom";
import { companyState } from "../../recoil/companyId/atom";
import { LoaderWrapper } from "../../components/common/loaderPageWrapper/styles";

interface IParams {
  job: string;
  company: string;
}

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding-top: 50px;
  padding-bottom: 100px;
`;

function RoadmapPage() {
  //NOTE - 쿼리스트링 파라미터 가져오는 부분
  const qs = require("querystring");
  const location = useLocation();
  const params: IParams = qs.parse(location.search.slice(1));

  const setJob = useSetRecoilState(jobState);
  const setCompany = useSetRecoilState(companyState);

  //NOTE - 페이지 들어오자마자 로드맵 API 호출
  const { isLoading: isRoadmapLoading, data: roadmapApiData } =
    useQuery<IRoadmap>("roadmap", () =>
      getRoadmap(+params.job, +params.company)
    );

  //NOTE - jobId, companyId를 recoil atom에 저장
  useEffect(() => {
    setJob(+params.job);
    setCompany(+params.company);
  }, []);

  return (
    <Wrapper>
      {!isRoadmapLoading ? (
        <RoadmapTitle
          $jobName={roadmapApiData?.data.jobName ?? "error"}
          $companyName={roadmapApiData?.data.companyName ?? "error"}
        />
      ) : null}
      {!isRoadmapLoading ? (
        <>
          <Road roadmapApiData={roadmapApiData} />
          <Footer />
        </>
      ) : (
        <>
          <Overlay />
          <LoaderWrapper>
            <Loader width={100} height={100} />
          </LoaderWrapper>
        </>
      )}
    </Wrapper>
  );
}

export default RoadmapPage;
