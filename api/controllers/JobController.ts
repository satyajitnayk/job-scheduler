import { QUEUE_NAME } from '../../common/constants';
import { SubmitJobUseCase } from '../../core/use-cases/SubmitJobUseCase';
import { PostgresAdapter } from '../../infra/db/PostgresAdapter';
import { BullMQAdapter } from '../../infra/queue/BullMQAdapter';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

const db = new PostgresAdapter(process.env.POSTGRES_URL!);
const queueAdapter = new BullMQAdapter(QUEUE_NAME, db);
const submitJobUseCase = new SubmitJobUseCase(queueAdapter, db);

export const submitJob = async (req: Request, res: Response) => {
  try {
    const { type, data } = req.body;
    const id = uuid();
    await submitJobUseCase.execute(type, id, data);
    res.status(201).send({ message: 'Job submitted successfully', job_id: id });
  } catch (error) {
    res.status(500).send({ error: 'Error submitting job' });
  }
};
