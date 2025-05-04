import express from 'express';
import jobRoutes from './routes/jobRoutes';

const app = express();
app.use(express.json());

app.use('/api', jobRoutes);

app.listen(3000, () => {
  console.log('API Server running on http://localhost:3000');
});
