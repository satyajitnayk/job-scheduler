import express from 'express';
import { JobController } from '../controllers/JobController';
import { PostgresAdapter } from '../../infra/db/PostgresAdapter';
import { BullMQAdapter } from '../../infra/queue/BullMQAdapter';
import { QUEUE_NAME } from '../../common/constants';

const router = express.Router();

const db = new PostgresAdapter(process.env.POSTGRES_URL!);
const queueAdapter = new BullMQAdapter(QUEUE_NAME, db);
const jobController = new JobController(queueAdapter, db);

router.post('/jobs', jobController.submitJob);
router.get('/jobs/:id', jobController.getJobStatus);
router.delete('/jobs/:id', jobController.removeJob);

export default router;
