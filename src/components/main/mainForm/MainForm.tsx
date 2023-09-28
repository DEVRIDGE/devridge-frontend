import { useHistory } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

import {
  Form,
  Option,
  Select,
  SelectName,
  SubmitButton,
  WrapperSelect,
} from "./styles";
import { ICompanies, IJobs } from "../../../services/types";
import Loader from "../../common/loader/Loader";
import { useSetRecoilState } from "recoil";
import { selectedDetailedPositionState } from "../../../recoil/selectedDetailedPosition/atom";

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
  const setSelectedDetailedPosition = useSetRecoilState(
    selectedDetailedPositionState
  );

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

  return (
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

          <SubmitButton onClick={() => setSelectedDetailedPosition(1)}>
            바로가기
          </SubmitButton>
        </>
      )}
    </Form>
  );
}

export default MainForm;
