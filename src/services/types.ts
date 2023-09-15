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
  detailedPosition: number;
}

export interface ICourse {
  id: number;
  name: string;
  type: string;
  matchingFlag: string;
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
  } | null;
}

export interface IGetRoadmapTechDetail {
  selectedTechId: number;
  jobId: number;
  companyId: number;
  selectedDetailedPosition: number;
}

export interface IGetRoadmapCourseDetail {
  selectedCourseId: number;
}

export interface IGetDetailedPositions {
  jobId: number;
  companyId: number;
}
