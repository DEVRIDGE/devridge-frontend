import { useQuery } from "react-query";

import { IRoadmapTechDetail } from "../recoil/roadmapTechDetail/atom";
import { getRoadmapTechDetail } from "../services/apis";
import { IGetRoadmapTechDetail } from "../services/types";

export function useRoadmapTechDetail({
  selectedTechId,
  jobId,
  companyId,
}: IGetRoadmapTechDetail) {
  const { isLoading, data } = useQuery<IRoadmapTechDetail>(
    "roadmapTechDetail",
    () => getRoadmapTechDetail({ selectedTechId, jobId, companyId })
  );
  return [isLoading, data];
}
