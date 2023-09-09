import { atom } from "recoil";

export const afterLoginState = atom({
  key: "afterLogin",
  default: "/",
});
