import { styled } from "styled-components";

export const Form = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 15vw;
  margin-right: 15vw;
  padding: 30px 10px;
  width: 70vw;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);

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
  flex-basis: 30%;
  padding: 6px 0;
  max-width: 200px;
  min-width: 100px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.mainColor};
  color: white;
  font-size: 12px;
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
  font-size: 12px;
  white-space: nowrap;
`;

export const Select = styled.select`
  flex-basis: 80%;
  padding: 5px;
  min-width: 100px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
`;

export const Option = styled.option``;
