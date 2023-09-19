import { atom } from "recoil";

export interface IRoadmapCourseVideos {
  id: number;
  title: string;
  likeCnt: number;
  thumbnail: string;
  url: string;
  source: string;
}

export interface IRoadmapCourseDetail {
  status: string;
  message: string;
  data: {
    courseTitle: string;
    courseDetailTitle: string;
    courseVideos: IRoadmapCourseVideos[];
  } | null;
}

export const roadmapCourseState = atom<IRoadmapCourseDetail>({
  key: "roadmapCourseState",
});
