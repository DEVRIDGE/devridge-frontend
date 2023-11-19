import { atom } from "recoil";

export interface IRoadmapStudyStatusCodes {
  [key: number]: Map<string, number>;
}

export const roadmapStudyStatusCodesState = atom<IRoadmapStudyStatusCodes>({
  key: "roadmapStudyStatusCodes",
  default: {},
});
