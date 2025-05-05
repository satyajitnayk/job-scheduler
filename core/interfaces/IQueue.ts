import {JobInfo} from '../entities/Job';

export interface JobOptions {
  delay?: number;
}

export interface IQueue {
    add(job: JobInfo, options?: JobOptions): Promise<void>;

    process(): Promise<void>;
}
