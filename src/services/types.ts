export interface IJob {
  id: number;
  name: string;
}

export interface IJobs {
  status: string;
  message: string;
  data: {
    jobs: IJob[];
  };
}

export interface ICompany {
  id: number;
  name: string;
}

export interface ICompanies {
  status: string;
  message: string;
  data: {
    companies: ICompany[];
  };
}

export interface IGetRoadmap {
  jobId: number;
  companyId: number;
}

export interface ICourse {
  id: number;
  name: string;
  type: string;
}

export interface ICourses {
  index: number;
  courses: ICourse[] | [];
}

export interface IRoadmap {
  status: string;
  message: string;
  data: {
    companyName: string;
    companyLogo: string;
    jobName: string;
    courseList: [ICourses | null];
  };
}

export interface IGetRoadmapTechDetail {
  selectedTechId: number;
  jobId: number;
  companyId: number;
}

export interface IGetRoadmapCourseDetail {
  selectedTechId: number;
  selectedCourseId: number;
  jobId: number;
  companyId: number;
}
