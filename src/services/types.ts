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
