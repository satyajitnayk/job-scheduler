import express from 'express';
import { submitJob } from '../controllers/JobController';

const router = express.Router();

router.post('/jobs', submitJob);

export default router;
