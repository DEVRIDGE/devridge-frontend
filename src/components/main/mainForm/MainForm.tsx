import {
  Option,
  Select,
  SelectName,
  SubmitButton,
  Wrapper,
  WrapperSelect,
} from "./styles";

function MainForm() {
  return (
    <Wrapper>
      <WrapperSelect>
        <SelectName>직무</SelectName>
        <Select>
          <Option>선택</Option>
        </Select>
      </WrapperSelect>
      <WrapperSelect>
        <SelectName>회사</SelectName>
        <Select>
          <Option>선택</Option>
        </Select>
      </WrapperSelect>
      <SubmitButton>바로가기</SubmitButton>
    </Wrapper>
  );
}

export default MainForm;
