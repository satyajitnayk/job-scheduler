import {JobEntity} from '../../core/entities/JobEntity';
import {JobFactory} from '../../core/factories/JobFactory';
import {IDatabase} from '../../core/interfaces/IDatabase';
import {IQueue} from '../../core/interfaces/IQueue';
import {JOB_STATUS} from "../../common/constants";

export class JobRepository {
    constructor(private queue: IQueue, private db: IDatabase) {
    }

    async addJob({type, id, data, delay}: { type: string, id: string, data: any, delay?: number }): Promise<void> {
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
        await this.queue.add(job, {delay});
    }

    async getJobStatus(id: string): Promise<string> {
        return await this.db.getStatus(id);
    }

    async removeJob(id: string): Promise<void> {
        const job = await this.db.findById(id);
        if(job?.status === JOB_STATUS.QUEUED || job?.status === JOB_STATUS.FAILED) {
            await this.queue.remove(id);
            await this.db.updateStatus(id, JOB_STATUS.CANCELLED);
        } else {
            throw new Error("job can not be cancelled");
        }
    }
}
