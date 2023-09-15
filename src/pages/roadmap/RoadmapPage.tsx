import { styled } from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
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
import Legend from "../../components/roadmap/legend/Legend";

interface IParams {
  job: string;
  company: string;
}

const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 100px;
  min-height: calc(100% - 50px);
`;

const SelectDetailedPositionWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 30px;
`;

const SelectDetailedPositionText = styled.span`
  margin-right: 10px;
  font-size: 14px;
  color: ${(props) => props.theme.textGreyColor};
`;

const SelectDetailedPosition = styled.select``;

const OptionDetailedPosition = styled.option``;

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
  const [detailedPositions, setDetailedPositions] = useRecoilState(
    detailedPositionsState
  );
  const [roadmap, setRoadmap] = useRecoilState(roadmapState);
  const [isLoadingRoadmapPage, setIsLoadingRoadmapPage] = useRecoilState(
    isLoadingRoadmapPageState
  );

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDetailedPosition(+event.target.value);
  };

  //NOTE - 페이지 들어오자마자 로드맵 API 호출
  // const { isLoading: isRoadmapLoading, data: roadmapApiData } =
  //   useQuery<IRoadmap>("roadmap", () =>
  //     getRoadmap(+params.job, +params.company)
  //   );

  //NOTE - 디테일 포지션 API, 로드맵 API 순차적 호출
  useEffect(() => {
    setJob(+params.job);
    setCompany(+params.company);
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
  }, [selectedDetailedPosition]);

  return (
    <Wrapper>
      {!isLoadingRoadmapPage ? (
        <>
          <RoadmapTitle
            $jobName={roadmap.data?.jobName ?? "error"}
            $companyName={roadmap.data?.companyName ?? "error"}
          />
          <Legend />
          <SelectDetailedPositionWrapper>
            <SelectDetailedPositionText>부서 선택</SelectDetailedPositionText>
            <SelectDetailedPosition
              onChange={handleSelect}
              value={selectedDetailedPosition}
            >
              {detailedPositions.data!.detailedPositionDtos.map(
                (detailedPosition) => (
                  <OptionDetailedPosition
                    key={detailedPosition.id}
                    value={detailedPosition.id}
                  >
                    {detailedPosition.name}
                  </OptionDetailedPosition>
                )
              )}
            </SelectDetailedPosition>
          </SelectDetailedPositionWrapper>
        </>
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
