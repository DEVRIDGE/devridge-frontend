import { styled } from "styled-components";

import { StatusCircle } from "../status/styles";

interface IWrapper {
  $col: number;
  $row: number;
}

export const Wrapper = styled.div<IWrapper>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$col}, minmax(50px, 1fr));
  grid-template-rows: repeat(${(props) => props.$row}, minmax(200px, 1fr));
  gap: 100px 20px;
  padding: 3vh 5vw;
`;

export const WrapperItem = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

export const Rope = styled.div<{ $marginTop?: string }>`
  margin-top: ${(props) => props.$marginTop || "3px"};
  width: 1px;
  height: 50px;
  border: 1px dashed ${(props) => props.theme.greyColor};
`;

export const ProgressBar = styled.div<{ $isDone?: boolean }>`
  position: absolute;
  top: 1vh;
  left: -15vw;
  width: 20vw;
  height: 15px;
  border: none;
  background-color: ${(props) =>
    props.$isDone ? props.theme.mainColor : props.theme.greyColor};
`;

export const TechButton = styled.button`
  display: contents;
  cursor: pointer;
`;

export const OverlayWrapper = styled.div`
  position: fixed;
  z-index: 3;
`;

export const CSList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CSButton = styled.button`
  position: relative;
  margin-top: 10px;
  width: 100px;
  height: 50px;
  border: 1px solid ${(props) => props.theme.greyColor};
  border-radius: 5px;
  background-color: white;
  color: black;
  font-size: 12px;
  cursor: pointer;

  ${StatusCircle} {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: -10px;
  }
`;

export const CSName = styled.span`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: keep-all;
`;
