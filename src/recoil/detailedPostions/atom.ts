import { atom } from "recoil";

export interface IDetailedPosition {
  id: number;
  name: string;
}

export interface IDetailedPositions {
  status: string;
  message: string;
  data: {
    detailedPositionDtos: IDetailedPosition[];
  } | null;
}

export const detailedPositionsState = atom<IDetailedPositions>({
  key: "detailedPositions",
  default: {
    status: "error",
    message: "",
    data: null,
  },
});
