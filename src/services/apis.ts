import axios from "axios";

import { IGetRoadmapCourseDetail, IGetRoadmapTechDetail } from "./types";
//TODO - try catch 예외처리도 하자

const BASE_PATH =
  process.env.NODE_ENV === "development"
    ? "http://ec2-3-34-60-62.ap-northeast-2.compute.amazonaws.com:8081"
    : "https://api.devridge.dev";

export function getJobs(accessToken: string) {
  if (accessToken) {
    return axios
      .get(`${BASE_PATH}/jobs`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => response.data);
  } else {
    return axios.get(`${BASE_PATH}/jobs`).then((response) => response.data);
  }
}

export function getCompanies() {
  return axios.get(`${BASE_PATH}/companies`).then((response) => response.data);
}

export function getRoadmap(jobId: number, companyId: number) {
  return axios
    .get(`${BASE_PATH}/courses?company=${companyId}&job=${jobId}`)
    .then((response) => response.data);
}

export function getRoadmapTechDetail({
  selectedTechId,
  jobId,
  companyId,
}: IGetRoadmapTechDetail) {
  return axios
    .get(
      `${BASE_PATH}/courses/${selectedTechId}?company=${companyId}&job=${jobId}`
    )
    .then((response) => response.data);
}

export function getRoadmapCourseDetail({
  selectedTechId,
  selectedCourseId,
  jobId,
  companyId,
}: IGetRoadmapCourseDetail) {
  return axios
    .get(
      `${BASE_PATH}/courses/${selectedTechId}/videos?company=${companyId}&job=${jobId}&coursedetail=${selectedCourseId}`
    )
    .then((response) => response.data);
}
