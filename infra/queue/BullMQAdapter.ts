import {Queue, Worker} from 'bullmq';
import {IQueue, JobOptions} from '../../core/interfaces/IQueue';
import {JobInfo} from '../../core/entities/Job';
import {JobFactory} from '../../core/factories/JobFactory';
import {redisConfig} from '../redis';
import {IDatabase} from '../../core/interfaces/IDatabase';
import {JOB_STATUS, RETRY} from '../../common/constants';

export class BullMQAdapter implements IQueue {
    private queue: Queue;
    private readonly queueName: string;
    private db: IDatabase;
    private worker?: Worker;

    constructor(queueName: string, db: IDatabase) {
        this.queueName = queueName;
        this.db = db;
        console.log('Connecting queue to Redis with config: ', redisConfig);
        this.queue = new Queue(queueName, {connection: redisConfig});
    }

    async add(job: JobInfo, options?: JobOptions): Promise<void> {
        await this.queue.add(job.type, job.data, {
            jobId: job.id,
            removeOnComplete: true,
            removeOnFail: false,
            attempts: RETRY,
            backoff: {
                type: "exponential",
                delay: 1000
            },
            delay: options?.delay ?? 0
        });
    }

    async process(): Promise<void> {
        this.worker = new Worker(
            this.queueName,
            async (job: any) => {
                const jobInstance = JobFactory.createJob(job.name, job.id, job.data);
                await jobInstance.run();
            },
            {connection: redisConfig}
        );
        console.log('Connecting to Redis with config: ', redisConfig);

        this.worker.on('completed', async (job) => {
            console.log(`Job ${job.id} completed successfully`);
            await this.db.updateStatus(job.id!, JOB_STATUS.COMPLETED);
        });

        this.worker.on('failed', async (job, err) => {
            console.error(`Job ${job?.id} failed with error: ${err.message}`);
            if (job) {
                await this.db.updateStatus(job.id!, JOB_STATUS.FAILED);
            }
        });

        this.worker.on('active', async (job) => {
            console.log(`Job ${job.id} is now active`);
        });

        this.worker.on('paused', () => {
            console.log('Worker is paused');
        });

        this.worker.on('resumed', () => {
            console.log('Worker has resumed processing');
        });

        this.worker.on('error', (err) => {
            console.error('Worker encountered an error:', err);
        });
    }

    async close(): Promise<void> {
        if (this.worker) {
            console.log('Closing the worker and queue');
            await this.worker.close();
        }

        await this.queue.close();
        console.log('Queue closed');
    }
}
