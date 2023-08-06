import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(3, 1fr);
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
