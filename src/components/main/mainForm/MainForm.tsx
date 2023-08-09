import { Link, useHistory } from "react-router-dom";
import { Oval } from "react-loader-spinner";

import {
  Form,
  Option,
  Select,
  SelectName,
  SubmitButton,
  WrapperSelect,
} from "./styles";
import { useTheme } from "styled-components";
import { ICompanies, IJobs } from "../../../services/types";
import { useForm, useWatch } from "react-hook-form";

interface IMainForm {
  isLoading: boolean;
  jobsApiData?: IJobs;
  companiesApiData?: ICompanies;
}

interface IForm {
  job: number;
  company: number;
}

function MainForm({ isLoading, jobsApiData, companiesApiData }: IMainForm) {
  const { register, handleSubmit, control } = useForm<IForm>();
  const theme = useTheme();
  const history = useHistory();
  const watchJob = useWatch({ control, name: "job", defaultValue: -1 });
  const watchCompany = useWatch({
    control,
    name: "company",
    defaultValue: -1,
  });
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
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isLoading ? (
        <Oval
          color={theme.mainColor}
          secondaryColor={theme.greyColor}
          strokeWidth={5}
          strokeWidthSecondary={5}
          height={30}
          width={30}
        />
      ) : (
        <>
          <WrapperSelect>
            <SelectName>직무</SelectName>
            <Select value={watchJob} {...register("job")}>
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
          <WrapperSelect>
            <SelectName>회사</SelectName>
            <Select value={watchCompany} {...register("company")}>
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
          <SubmitButton>바로가기</SubmitButton>
        </>
      )}
    </Form>
  );
}

export default MainForm;
