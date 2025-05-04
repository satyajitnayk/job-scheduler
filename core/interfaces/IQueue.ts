import { Job } from '../entities/Job';

export interface IQueue {
  add(job: Job): Promise<void>;
  process(): Promise<void>;
}
