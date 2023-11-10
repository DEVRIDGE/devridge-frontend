import { atom } from "recoil";

interface IColCodes {
  [key: number]: number;
}

export interface IRoadmapStudyStatusCodes {
  [key: number]: {
    [key: number]: number;
  };
}

export const roadmapStudyStatusCodesState = atom<IRoadmapStudyStatusCodes>({
  key: "roadmapStudyStatusCodes",
  default: {},
});
