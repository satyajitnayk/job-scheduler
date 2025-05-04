import {JobEntity} from '../../core/entities/JobEntity';
import {JobFactory} from '../../core/factories/JobFactory';
import {IDatabase} from '../../core/interfaces/IDatabase';
import {IQueue} from '../../core/interfaces/IQueue';

export class JobRepository {
    constructor(private queue: IQueue, private db: IDatabase) {
    }

    async addJob(type: string, id: string, data: any): Promise<void> {
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
        await this.db.save(jobEntity);

        // Enqueue for processing
        await this.queue.add(job);
    }

    async getJobStatus(id: string): Promise<string> {
        return await this.db.getStatus(id);
    }
}
