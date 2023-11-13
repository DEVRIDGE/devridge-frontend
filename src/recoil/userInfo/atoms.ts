import { atom } from "recoil";
import { IUserInfoData } from "../../services/types";

export const userInfoState = atom<IUserInfoData | null>({
  key: "userInfo",
  default: null,
});
