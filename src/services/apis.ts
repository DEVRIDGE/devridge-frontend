import axios from "axios";

export function getJobs() {
  return axios.get("/api/jobs").then((response) => response.data);
}

export function getCompanies() {
  return axios.get("/api/companies").then((response) => response.data);
}
