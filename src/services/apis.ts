import axios from "axios";
import {
  IGetRoadmap,
  IGetRoadmapCourseDetail,
  IGetRoadmapTechDetail,
} from "./types";

export function getJobs() {
  return axios.get("/api/jobs").then((response) => response.data);
}

export function getCompanies() {
  return axios.get("/api/companies").then((response) => response.data);
}

export function getRoadmap(jobId: number, companyId: number) {
  return axios
    .get(`/api/courses?company=${companyId}&job=${jobId}`)
    .then((response) => response.data);
}

export function getRoadmapTechDetail({
  selectedTechId,
  jobId,
  companyId,
}: IGetRoadmapTechDetail) {
  return axios
    .get(`/api/courses/${selectedTechId}?company=${companyId}&job=${jobId}`)
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
      `/api/courses/${selectedTechId}/videos?company=${companyId}&job=${jobId}&coursedetail=${selectedCourseId}`
    )
    .then((response) => response.data);
}
