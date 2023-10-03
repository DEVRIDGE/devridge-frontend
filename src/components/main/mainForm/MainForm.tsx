import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import {
  DropdownCaretWrapper,
  DropdownDescription,
  DropdownLable,
  DropdownListWrapper,
  DropdownOption,
  DropdownOptionList,
  DropdownWrapper,
  Form,
  Option,
  Select,
  SelectName,
  SubmitButton,
  WrapperSelect,
} from "./styles";
import { ICompanies, IJobs } from "../../../services/types";
import Loader from "../../common/loader/Loader";
import useAdaptiveWidth from "../../../hooks/useAdaptiveWidth";
import DownCaretSvg from "../../common/downCaretSvg/DownCaretSvg";
import { isJobDropdownOptionsState } from "../../../recoil/isJobDropdownOptions/atoms";
import { isCompanyDropdownOptionsState } from "../../../recoil/isCompanyDropdownOptions/atoms";

interface IForm {
  event: React.FormEvent<HTMLFormElement>;
  job: number;
  company: number;
}

interface IOnClickedDropdownOption {
  optionId: number;
  optionText: string;
}

function MainForm() {
  const currentWidth = useAdaptiveWidth();

  const { register, handleSubmit } = useForm<IForm>();
  const history = useHistory();
  const onSubmit = ({ job, company }: IForm) => {
    if (+job === -1 && +company === -1) {
      alert("직무와 회사를 선택해주세요.");
    } else if (+job === -1) {
      alert("직무를 선택해주세요.");
    } else if (+company === -1) {
      alert("회사를 선택해주세요.");
    } else {
      history.push(`/roadmap?job=${job}&company=${company}`);
    }
  };
  const onSubmitDesktop = ({ event, job, company }: IForm) => {
    event.preventDefault();
    if (+job === -1 && +company === -1) {
      alert("직무와 회사를 선택해주세요.");
    } else if (+job === -1) {
      alert("직무를 선택해주세요.");
    } else if (+company === -1) {
      alert("회사를 선택해주세요.");
    } else {
      history.push(`/roadmap?job=${job}&company=${company}`);
    }
  };

  const [jobId, setJobId] = useState(-1);
  const [companyId, setCompanyId] = useState(-1);

  const [selectedJobDropdownLabelText, setSelectedJobDropdownLabelText] =
    useState("");
  const [
    selectedCompanyDropdownLabelText,
    setSelectedCompanyDropdownLabelText,
  ] = useState("");
  const [isJobDropdownOptions, setIsJobDropdownOptions] = useRecoilState(
    isJobDropdownOptionsState
  );
  const [isCompanyDropdownOptions, setIsCompanyDropdownOptions] =
    useRecoilState(isCompanyDropdownOptionsState);
  const onClickedJobDropdownLabel = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsJobDropdownOptions((prev) => !prev);
    setIsCompanyDropdownOptions(false);
  };
  const onClickedCompanyDropdownLabel = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    setIsCompanyDropdownOptions((prev) => !prev);
    setIsJobDropdownOptions(false);
  };
  const onClickedJobDropdownOption = ({
    optionId,
    optionText,
  }: IOnClickedDropdownOption) => {
    setIsJobDropdownOptions((prev) => !prev);
    setSelectedJobDropdownLabelText(optionText);
    setJobId(optionId);
  };
  const onClickedCompanyDropdownOption = ({
    optionId,
    optionText,
  }: IOnClickedDropdownOption) => {
    setIsCompanyDropdownOptions((prev) => !prev);
    setSelectedCompanyDropdownLabelText(optionText);
    setCompanyId(optionId);
  };

  //NOTE - API 호출 로직
  const isCompaniesLoading = useState(false);
  const isJobsLoading = useState(false);

  const companiesApiData: ICompanies = null;
  const jobsApiData: IJobs = null;

  useEffect(() => {
    setSelectedCompanyDropdownLabelText("선택");
    setSelectedJobDropdownLabelText("선택");
    setCompanyId(-1);
    setJobId(-1);

    const invokeCompaniesApi = async () => {
      companiesApiData = await getCompanies();
    };

    invokeCompaniesApi();
  }, []);

  return currentWidth < 768 ? (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <WrapperSelect>
            <SelectName>회사</SelectName>
            <Select defaultValue={-1} {...register("company")}>
              <Option value={-1} disabled>
                선택
              </Option>
              {companiesApiData?.data.companies.map((company) => (
                <Option key={company.id} value={company.id}>
                  {company.name}
                </Option>
              ))}
            </Select>
          </WrapperSelect>
          <WrapperSelect>
            <SelectName>직무</SelectName>
            <Select defaultValue={-1} {...register("job")}>
              <Option value={-1} disabled>
                선택
              </Option>
              {jobsApiData?.data.jobs.map((job) => (
                <Option key={job.id} value={job.id}>
                  {job.name}
                </Option>
              ))}
            </Select>
          </WrapperSelect>

          <SubmitButton>바로가기</SubmitButton>
        </>
      )}
    </Form>
  ) : (
    <Form
      onSubmit={(event) =>
        onSubmitDesktop({ event, job: jobId, company: companyId })
      }
    >
      <DropdownWrapper>
        <DropdownDescription>회사</DropdownDescription>
        <DropdownListWrapper>
          <DropdownLable
            onClick={onClickedCompanyDropdownLabel}
            $isDropdownOptions={isCompanyDropdownOptions}
          >
            {selectedCompanyDropdownLabelText}
            <DropdownCaretWrapper>
              <DownCaretSvg />
            </DropdownCaretWrapper>
          </DropdownLable>
          {isCompanyDropdownOptions ? (
            <DropdownOptionList>
              {companiesApiData?.data.companies.map((company) => (
                <DropdownOption
                  key={company.id}
                  onClick={() =>
                    onClickedCompanyDropdownOption({
                      optionId: company.id,
                      optionText: company.name,
                    })
                  }
                >
                  {company.name}
                </DropdownOption>
              ))}
            </DropdownOptionList>
          ) : null}
        </DropdownListWrapper>
      </DropdownWrapper>
      <DropdownWrapper>
        <DropdownDescription>직무</DropdownDescription>
        <DropdownListWrapper>
          <DropdownLable
            onClick={onClickedJobDropdownLabel}
            $isDropdownOptions={isJobDropdownOptions}
          >
            {selectedJobDropdownLabelText}
            <DropdownCaretWrapper>
              <DownCaretSvg />
            </DropdownCaretWrapper>
          </DropdownLable>
          {isJobDropdownOptions ? (
            <DropdownOptionList>
              {jobsApiData?.data.jobs.map((job) => (
                <DropdownOption
                  key={job.id}
                  onClick={() =>
                    onClickedJobDropdownOption({
                      optionId: job.id,
                      optionText: job.name,
                    })
                  }
                >
                  {job.name}
                </DropdownOption>
              ))}
            </DropdownOptionList>
          ) : null}
        </DropdownListWrapper>
      </DropdownWrapper>
      <SubmitButton>바로 가기</SubmitButton>
    </Form>
  );
}

export default MainForm;
