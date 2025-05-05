export interface JobInfo {
  id: string;
  type: string;
  data: any;
  run(): Promise<any>;
}
