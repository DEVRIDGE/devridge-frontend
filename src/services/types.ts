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
  accessToken?: string | null;
}

export interface ICourse {
  id: number;
  name: string;
  type: string;
  matchingFlag: string;
  studyStatus: string | null;
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
    jobName: string;
    companyInfoUrl: string | null;
    courseList: [ICourses | null];
  } | null;
}

export interface IGetRoadmapTechDetail {
  selectedTechId: number;
  jobId: number;
  companyId: number;
  selectedDetailedPosition: number;
  accessToken: string | null;
}

export interface IGetRoadmapCourseDetail {
  selectedTechId: number;
  selectedCourseId: number;
  jobId: number;
  companyId: number;
  selectedDetailedPosition: number;
  accessToken: string | null;
}

export interface IGetDetailedPositions {
  jobId: number;
  companyId: number;
}

export interface IGetNewAccessToken {
  // NOTE - 임시
  refreshToken: string | null;
}

export interface INewAccessToken {
  status: string;
  message: string;
  data: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
  } | null;
}

export interface IGetUserInfo {
  accessToken: string;
}

export interface IUserInfoData {
  email: string;
  name: string;
  profilePicture: string;
  provider: string;
}

export interface IUserInfo {
  status: string;
  message: string;
  data: IUserInfoData | null;
}

export interface IPostStudyStatus {
  accessToken: string | null;
  selectedTechId: number;
  studyStatus: string;
  companyId: number;
  jobId: number;
  detailedPosition: number;
}

export interface IStudyStatusResponse {
  status: string;
  message: string;
  data: null;
}

export interface IPostUserLikedYn {
  selectedVideoId: number;
  accessToken: string;
}

export interface IUserLikedYn {
  status: string;
  message: string;
  data: null;
}
