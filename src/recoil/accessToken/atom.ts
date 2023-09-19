import { atom } from "recoil";

export const accessTokenState = atom<string | null>({
  key: "accessToken",
  default: null,
});
