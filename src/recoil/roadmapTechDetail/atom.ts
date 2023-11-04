import { atom } from "recoil";

export interface ICourseDetails {
  id: number;
  name: string;
}

export interface IRoadmapTechDetail {
  status: string;
  message: string;
  data: {
    courseName: string;
    loginStatus: string;
    studyStatus: string | null;
    courseDetails: ICourseDetails[];
  } | null;
}

export const roadmapTechState = atom<IRoadmapTechDetail>({
  key: "roadmapTechState",
});
