import { styled } from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";

import RoadmapTitle from "../../components/roadmap/roadmapTitle/RoadmapTitle";
import Road from "../../components/roadmap/road/Road";
import Footer from "../../components/common/footer/Footer";
import { getDetailedPositions, getRoadmap } from "../../services/apis";
import { IRoadmap } from "../../services/types";
import Overlay from "../../components/common/overlay/Overlay";
import Loader from "../../components/common/loader/Loader";
import { jobState } from "../../recoil/jobId/atom";
import { companyState } from "../../recoil/companyId/atom";
import { LoaderWrapper } from "../../components/common/loaderPageWrapper/styles";
import { selectedDetailedPositionState } from "../../recoil/selectedDetailedPosition/atom";
import {
  IDetailedPositions,
  detailedPositionsState,
} from "../../recoil/detailedPostions/atom";
import { ApiStatus } from "../../constants/enums";
import { roadmapState } from "../../recoil/roadmap/atom";
import { isLoadingRoadmapPageState } from "../../recoil/isLoadingRoadmapPage/atom";

interface IParams {
  job: string;
  company: string;
}

const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
  padding-bottom: 100px;
`;

// TODO - 데브옵스, 안드로이드, ios name undefined 오류 해결하자

function RoadmapPage() {
  const history = useHistory();

  //NOTE - 쿼리스트링 파라미터 가져오는 부분
  const qs = require("querystring");
  const location = useLocation();
  const params: IParams = qs.parse(location.search.slice(1));

  const setJob = useSetRecoilState(jobState);
  const setCompany = useSetRecoilState(companyState);
  const [selectedDetailedPosition, setSelectedDetailedPosition] =
    useRecoilState(selectedDetailedPositionState);
  const setDetailedPositions = useSetRecoilState(detailedPositionsState);
  const [roadmap, setRoadmap] = useRecoilState(roadmapState);
  const [isLoadingRoadmapPage, setIsLoadingRoadmapPage] = useRecoilState(
    isLoadingRoadmapPageState
  );

  //NOTE - 페이지 들어오자마자 로드맵 API 호출
  // const { isLoading: isRoadmapLoading, data: roadmapApiData } =
  //   useQuery<IRoadmap>("roadmap", () =>
  //     getRoadmap(+params.job, +params.company)
  //   );

  //NOTE - jobId, companyId를 recoil atom에 저장
  useEffect(() => {
    setJob(+params.job);
    setCompany(+params.company);
    setSelectedDetailedPosition(1);
    setIsLoadingRoadmapPage(true);

    const handleDetailedPositionsApi = async () => {
      const detailedPositionApiData: IDetailedPositions =
        await getDetailedPositions({
          companyId: +params.company,
          jobId: +params.job,
        });

      if (detailedPositionApiData.status === ApiStatus.error) {
        alert("예기치 않은 오류가 발생하였습니다. 관리자에게 문의해주세요.");
        history.push("/");
        return;
      } else {
        setDetailedPositions(detailedPositionApiData);
      }
    };

    const handleRoadmapApi = async () => {
      const roadmapApiData: IRoadmap = await getRoadmap({
        jobId: +params.job,
        companyId: +params.company,
        detailedPosition: selectedDetailedPosition,
      });

      if (roadmapApiData.status === ApiStatus.error) {
        alert("예기치 않은 오류가 발생하였습니다. 관리자에게 문의해주세요.");
        history.push("/");
        return;
      } else {
        setRoadmap(roadmapApiData);
        setIsLoadingRoadmapPage(false);
      }
    };

    handleDetailedPositionsApi();
    handleRoadmapApi();
  }, []);

  return (
    <Wrapper>
      {!isLoadingRoadmapPage ? (
        <RoadmapTitle
          $jobName={roadmap.data?.jobName ?? "error"}
          $companyName={roadmap.data?.companyName ?? "error"}
        />
      ) : null}
      {!isLoadingRoadmapPage ? (
        <>
          <Road roadmapApiData={roadmap} />
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
