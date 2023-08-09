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
