import { atom } from "recoil";

export interface IRoadmapCourseVideos {
  id: number;
  title: string;
  likeCnt?: number | null;
  thumbnail: string;
  url: string;
  userLikedYn?: string | null;
  source: string;
}

export interface IRoadmapCourseBooks {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  source: string;
}

export interface IRoadmapCourseDetail {
  status: string;
  message: string;
  data: {
    courseTitle: string;
    courseDetailTitle: string;
    courseDetailDescription: string;
    courseVideos: IRoadmapCourseVideos[];
    courseBooks: IRoadmapCourseBooks[];
  } | null;
}

export const roadmapCourseState = atom<IRoadmapCourseDetail>({
  key: "roadmapCourseState",
});
