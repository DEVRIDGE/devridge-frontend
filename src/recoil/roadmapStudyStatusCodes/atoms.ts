import { atom } from "recoil";

export interface IRoadmapStudyStatusCodes {
  [key: number]:
    | {
        [key: string]: number;
      }
    | {};
}

export const roadmapStudyStatusCodesState = atom<IRoadmapStudyStatusCodes>({
  key: "roadmapStudyStatusCodes",
  default: [],
});
