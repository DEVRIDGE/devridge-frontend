import axios from "axios";

import {
  IGetDetailedPositions,
  IGetRoadmap,
  IGetRoadmapCourseDetail,
  IGetRoadmapTechDetail,
} from "./types";
//TODO - try catch 예외처리도 하자

export const BASE_PATH = "https://api.devridge.dev";

axios.defaults.withCredentials = true;

export function getApplyRefreshToken() {
  return axios
    .get(`${BASE_PATH}/token/apply/1`)
    .then((response) => response.data);
}

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

export function getRoadmap({
  jobId,
  companyId,
  detailedPosition,
}: IGetRoadmap) {
  return axios
    .get(
      `${BASE_PATH}/courses?company=${companyId}&job=${jobId}&detailedPosition=${detailedPosition}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((axiosError) => {
      return axiosError.response.data;
    });
}

export function getRoadmapTechDetail({
  selectedTechId,
  jobId,
  companyId,
  selectedDetailedPosition,
}: IGetRoadmapTechDetail) {
  return axios
    .get(
      `${BASE_PATH}/courses/${selectedTechId}?company=${companyId}&job=${jobId}&detailedPosition=${selectedDetailedPosition}`
    )
    .then((response) => response.data)
    .catch((axiosError) => {
      return axiosError.response.data;
    });
}

export function getRoadmapCourseDetail({
  selectedCourseId,
}: IGetRoadmapCourseDetail) {
  return axios
    .get(`${BASE_PATH}/videos?courseDetail=${selectedCourseId}`)
    .then((response) => response.data);
}

export function getDetailedPositions({
  jobId,
  companyId,
}: IGetDetailedPositions) {
  return axios
    .get(`${BASE_PATH}/detailedPositions?company=${companyId}&job=${jobId}`)
    .then((response) => response.data)
    .catch((axiosError) => {
      return axiosError.response.data;
    });
}
