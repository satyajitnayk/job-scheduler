import {IDatabase} from '../../core/interfaces/IDatabase';
import {IQueue} from '../../core/interfaces/IQueue';
import {JobRepository} from '../repositories/JobRepository';

import {Request, Response} from 'express';
import {v4 as uuid} from 'uuid';

export class JobController {
    private repository: JobRepository;

    constructor(queueAdapter: IQueue, db: IDatabase) {
        this.repository = new JobRepository(queueAdapter, db);
    }

    submitJob = async (req: Request, res: Response) => {
        try {
            const {type, data, delay} = req.body;
            const jobId = uuid();
            await this.repository.addJob({type, id: jobId, data, delay});
            res.status(201).send({message: 'Job submitted successfully', jobId});
        } catch (error) {
            console.log(error);
            res.status(500).send({error: 'Error submitting job'});
        }
    }

    removeJob = async (req: Request, res: Response) => {
        try {
            const jobId = req.params.id;
            if (!jobId) {
                res.status(400).send({error: 'jobId is required!'});
            }
            await this.repository.removeJob(jobId);
            res.status(200).send({message: 'Job removed successfully'});
        } catch (error) {
            console.log(error);
            res.status(500).send({error: 'Error deleting job'});
        }
    }

    getJobStatus = async (req: Request, res: Response) => {
        try {
            const jobId = req.params.id;
            const status = await this.repository.getJobStatus(jobId);
            if (status) {
                res.status(200).send({status});
            } else {
                res.status(404).send({message: 'Job not found'});
            }
        } catch (error) {
            res.status(500).send({error: 'Error gettong job status'});
        }
    }
}
