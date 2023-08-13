import { atom } from "recoil";

export enum SwitchDetail {
  "BLIND" = "BLIND",
  "TECH" = "TECH",
  "COURSE" = "COURSE",
}

export const switchRoadmapDetailState = atom<SwitchDetail>({
  key: "switchRoadmap",
  default: SwitchDetail.BLIND,
});
