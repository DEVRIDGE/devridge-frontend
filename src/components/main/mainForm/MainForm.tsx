import { useHistory } from "react-router-dom";
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
import { getCompanies, getJobs } from "../../../services/apis";

interface IForm {
  event: any;
  job: number;
  company: number;
}

interface IOnClickedDropdownOption {
  optionId: number;
  optionText: string;
}

function MainForm() {
  const currentWidth = useAdaptiveWidth();

  const history = useHistory();
  const handleSubmit = ({ event, job, company }: IForm) => {
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

    if (isSelectCompany) {
      setIsJobDropdownOptions((prev) => !prev);
      setIsCompanyDropdownOptions(false);
    } else {
      alert("회사를 먼저 선택해주세요.");
    }
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
  const onClickedCompanyDropdownOption = async ({
    optionId,
    optionText,
  }: IOnClickedDropdownOption) => {
    setIsCompanyDropdownOptions((prev) => !prev);
    setSelectedCompanyDropdownLabelText(optionText);
    setCompanyId(optionId);
    setIsSelectCompany(true);

    setIsJobsLoading(true);
    setJobsApiData(await getJobs(optionId));
    setIsJobsLoading(false);
  };

  //NOTE - API 호출 로직
  const [isSelectCompany, setIsSelectCompany] = useState(false);

  const [isCompaniesLoading, setIsCompaniesLoading] = useState(false);
  const [isJobsLoading, setIsJobsLoading] = useState(false);

  const [companiesApiData, setCompaniesApiData] = useState<ICompanies>();
  const [jobsApiData, setJobsApiData] = useState<IJobs>();

  useEffect(() => {
    setSelectedCompanyDropdownLabelText("선택");
    setSelectedJobDropdownLabelText("선택");
    setCompanyId(-1);
    setJobId(-1);

    const invokeCompaniesApi = async () => {
      setCompaniesApiData(await getCompanies());
    };

    setIsCompaniesLoading(true);
    invokeCompaniesApi();
    setIsCompaniesLoading(false);
  }, []);

  return currentWidth < 768 ? (
    <Form
      onSubmit={(event) =>
        handleSubmit({ event, job: jobId, company: companyId })
      }
    >
      {isCompaniesLoading || isJobsLoading ? (
        <Loader />
      ) : (
        <>
          <WrapperSelect>
            <SelectName>회사</SelectName>
            <Select
              value={companyId}
              onChange={async (event) => {
                setCompanyId(+event.target.value);
                setIsSelectCompany(true);
                setIsJobsLoading(true);
                setJobsApiData(await getJobs(+event.target.value));
                setIsJobsLoading(false);
              }}
            >
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
            <Select
              onClick={() => {
                if (!isSelectCompany) {
                  alert("회사를 먼저 선택해주세요.");
                }
              }}
              onChange={(event) => {
                setJobId(+event.target.value);
              }}
              value={jobId}
            >
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
        handleSubmit({ event, job: jobId, company: companyId })
      }
    >
      {isCompaniesLoading || isJobsLoading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </Form>
  );
}

export default MainForm;
