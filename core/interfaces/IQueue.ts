import { JobInfo } from '../entities/Job';

export interface IQueue {
  add(job: JobInfo): Promise<void>;
  process(): Promise<void>;
}
