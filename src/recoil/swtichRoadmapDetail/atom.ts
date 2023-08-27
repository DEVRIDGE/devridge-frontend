import { atom } from "recoil";
import { SwitchDetail } from "../../constants/enums";

export const switchRoadmapDetailState = atom<SwitchDetail>({
  key: "switchRoadmap",
  default: SwitchDetail.BLIND,
});
