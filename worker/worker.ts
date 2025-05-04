import { QUEUE_NAME } from '../common/constants';
import { PostgresAdapter } from '../infra/db/PostgresAdapter';
import { BullMQAdapter } from '../infra/queue/BullMQAdapter';

const db = new PostgresAdapter(process.env.POSTGRES_URL!);
const queueAdapter = new BullMQAdapter(QUEUE_NAME, db);

const startWorker = async () => {
  try {
    await queueAdapter.process();
    console.log(
      `👷 Worker started using BullMQAdapter for queue: ${QUEUE_NAME}`
    );
  } catch (error) {
    console.error('Error starting worker:', error);
    process.exit(1);
  }
};

startWorker();

process.on('SIGINT', async () => {
  console.log('Gracefully shutting down worker...');
  await queueAdapter.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Gracefully shutting down worker...');
  await queueAdapter.close();
  process.exit(0);
});
