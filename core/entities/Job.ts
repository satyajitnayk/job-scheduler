export interface Job {
  id: string;
  type: string;
  data: any;
  run(): Promise<any>;
}
