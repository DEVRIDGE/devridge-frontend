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
  };
}

export const detailedPositionsState = atom<IDetailedPositions>({
  key: "detailedPositions",
});
