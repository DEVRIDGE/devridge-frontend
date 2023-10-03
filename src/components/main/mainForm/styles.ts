import { styled } from "styled-components";

export const Form = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 15vw;
  margin-right: 15vw;
  padding: 30px 10px;
  width: 70vw;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.greyColor};
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 767px) {
    flex-direction: column;
    padding: 10px 20px;
  }
`;

export const WrapperSelect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 30%;

  @media screen and (max-width: 767px) {
    margin-top: 10px;
    width: 100%;
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 20%;
  padding: 6px 0;
  max-width: 200px;
  min-width: 100px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.mainColor};
  color: white;
  font-size: 16px;
  cursor: pointer;

  @media screen and (max-width: 767px) {
    margin: 20px 0 10px 0;
    width: 100%;
    max-width: none;
  }
`;

export const SelectName = styled.span`
  flex-basis: 20%;
  margin-right: 10px;
  font-size: 20px;
  white-space: nowrap;
`;

export const Select = styled.select`
  flex-basis: 80%;
  margin-top: 3px;
  padding: 5px;
  min-width: 100px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
`;

export const Option = styled.option``;

export const DropdownWrapper = styled.div`
  display: flex;
  flex-basis: 30%;
`;

export const DropdownDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  height: 30px;
  font-weight: bold;
  word-break: keep-all;
`;

export const DropdownListWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownLable = styled.label<{ $isDropdownOptions: boolean }>`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 13px;
  max-width: 240px;
  min-width: 130px;
  border: 1px solid
    ${(props) =>
      props.$isDropdownOptions ? props.theme.mainColor : props.theme.greyColor};
  color: ${(props) =>
    props.$isDropdownOptions ? props.theme.mainColor : props.theme.textColor};
  font-weight: ${(props) => (props.$isDropdownOptions ? "bold" : "normal")};
  border-radius: 5px;
`;

export const DropdownOptionList = styled.ul`
  overflow: auto;
  position: absolute;
  top: 40px;
  padding: 8px;
  width: 100%;
  max-height: 140px;
  border: 1px solid ${(props) => props.theme.greyColor};
  border-radius: 5px;
  background-color: ${(props) => props.theme.bgColor};
  z-index: 4;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DropdownOption = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => props.theme.mainColorLight};
    color: ${(props) => props.theme.mainColor};
    font-weight: bold;
  }
`;

export const DropdownCaretWrapper = styled.div`
  position: absolute;
  right: 10px;

  svg {
    fill: ${(props) => props.theme.greyColor};
  }
`;
