import axios from "axios";

import {
  IGetDetailedPositions,
  IGetNewAccessToken,
  IGetRoadmap,
  IGetRoadmapCourseDetail,
  IGetRoadmapTechDetail,
  IGetUserInfo,
  IPostStudyStatus,
  IPostUserLikedYn,
} from "./types";
//TODO - try catch 예외처리도 하자

export const BASE_PATH = "https://api.devridge.dev";

axios.defaults.withCredentials = true;

export function getApplyRefreshToken() {
  //NOTE - 테스트용
  return axios
    .get(`${BASE_PATH}/token/apply/1`)
    .then((response) => response.data);
}

export function getCompanies() {
  return axios.get(`${BASE_PATH}/companies`).then((response) => response.data);
}

export function getJobs(companyId: number) {
  return axios
    .get(`${BASE_PATH}/jobs?company=${companyId}`)
    .then((response) => response.data);
}

export function getRoadmap({
  jobId,
  companyId,
  detailedPosition,
  accessToken = null,
}: IGetRoadmap) {
  return axios
    .get(
      `${BASE_PATH}/courses?company=${companyId}&job=${jobId}&detailedPosition=${detailedPosition}`,
      accessToken !== null
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : {}
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
  accessToken = null,
}: IGetRoadmapTechDetail) {
  return axios
    .get(
      `${BASE_PATH}/courses/${selectedTechId}?company=${companyId}&job=${jobId}&detailedPosition=${selectedDetailedPosition}`,
      accessToken !== null
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : {}
    )
    .then((response) => response.data)
    .catch((axiosError) => {
      return axiosError.response.data;
    });
}

export function getRoadmapCourseDetail({
  selectedTechId,
  selectedCourseId,
  jobId,
  companyId,
  selectedDetailedPosition,
  accessToken = null,
}: IGetRoadmapCourseDetail) {
  return axios
    .get(
      `${BASE_PATH}/items?course=${selectedTechId}&courseDetail=${selectedCourseId}&job=${jobId}&company=${companyId}&detailedPosition=${selectedDetailedPosition}`,
      accessToken !== null
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : {}
    )
    .then((response) => response.data)
    .catch((axiosError) => {
      return axiosError.response.data;
    });
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

export function getNewAccessToken({ refreshToken }: IGetNewAccessToken) {
  // NOTE - 임시
  return axios
    .post(`${BASE_PATH}/token/reissue`, {
      token: refreshToken,
    })
    .then((response) => response.data)
    .catch((axiosError) => {
      return axiosError.response.data;
    });
}

export function getUserInfo({ accessToken }: IGetUserInfo) {
  return axios
    .get(`${BASE_PATH}/users/channeltalkinfo`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((axiosError) => {
      return axiosError.response.data;
    });
}

export function postStudyStatus({
  accessToken,
  selectedTechId,
  studyStatus,
  companyId,
  jobId,
  detailedPosition,
}: IPostStudyStatus) {
  return axios
    .post(
      `${BASE_PATH}/courses/${selectedTechId}/change-studystatus`,
      {
        companyId: companyId,
        jobId: jobId,
        detailedPositionId: detailedPosition,
        studyStatus: studyStatus,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((axiosError) => {
      return axiosError.response.data;
    });
}

export function postUserLikedYn({
  selectedVideoId,
  accessToken,
}: IPostUserLikedYn) {
  return axios
    .post(
      `${BASE_PATH}/videos/like`,
      {
        courseVideoId: selectedVideoId,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((axiosError) => {
      return axiosError.response.data;
    });
}
