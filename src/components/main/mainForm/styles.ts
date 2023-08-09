import { styled } from "styled-components";

export const Form = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 15vw;
  margin-right: 15vw;
  padding: 30px 10px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
`;

export const WrapperSelect = styled.div``;

export const SubmitButton = styled.button`
  padding: 6px 0;
  width: 150px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.mainColor};
  color: white;
  font-size: 12px;
  cursor: pointer;
`;

export const SelectName = styled.span`
  margin-right: 10px;
  font-size: 12px;
`;

export const Select = styled.select`
  width: 150px;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
`;

export const Option = styled.option``;
