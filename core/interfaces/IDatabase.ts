import { JobEntity } from '../entities/JobEntity';

export interface IDatabase {
  save(job: JobEntity): Promise<void>;
  updateStatus(id: string, status: string): Promise<void>;
  findById(id: string): Promise<JobEntity | null>;
}
