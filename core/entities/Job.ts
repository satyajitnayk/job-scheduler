export interface JobInfo {
  id: string;
  type: string;
  data: any;
  delay?:number;
  run(): Promise<any>;
}
