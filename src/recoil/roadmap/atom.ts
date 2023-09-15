import { atom } from "recoil";
import { IRoadmap } from "../../services/types";

export const roadmapState = atom<IRoadmap>({
  key: "roadmap",
  default: {
    status: "error",
    message: "로드맵 페이지 오류",
    data: null,
  },
});
