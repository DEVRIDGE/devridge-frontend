import { useSetRecoilState } from "recoil";
import { isProfileDropdownState } from "../recoil/isProfileDropdown/atoms";

const useOnClickedProfileOuter = () => {
  const setIsProfileDropdown = useSetRecoilState(isProfileDropdownState);

  return () => setIsProfileDropdown(false);
};

export default useOnClickedProfileOuter;
