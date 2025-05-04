import { JobEntity } from '../entities/JobEntity';
import { JobFactory } from '../factories/JobFactory';
import { IDatabase } from '../interfaces/IDatabase';
import { IQueue } from '../interfaces/IQueue';

export class SubmitJobUseCase {
  constructor(private queue: IQueue, private database: IDatabase) {}

  async execute(type: string, id: string, data: any): Promise<void> {
    const job = JobFactory.createJob(type, id, data);

    // Save to DB
    const jobEntity: JobEntity = {
      id,
      type,
      payload: data,
      status: 'queued',
      created_at: new Date(),
      updated_at: new Date(),
    };
    await this.database.save(jobEntity);

    // Enqueue for processing
    await this.queue.add(job);
  }
}
