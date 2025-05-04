export const QUEUE_NAME = process.env.QUEUE_NAME || 'jobqueue';

export const JOB_STATUS = {
  QUEUED: 'queued',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
  PENDING: 'pending',
  CANCELLED: 'cancelled',
};
