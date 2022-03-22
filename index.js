import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import covid from './src/routes/covid.route.js';
import connectDB from './src/services/db.service.js';
import scheduler from './src/utils/scheduler.js';

connectDB();
const app = express();
app.use(express.json());

const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));

app.use('/covid', covid);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(5000, function () {
  console.log('Listening on port 5000');
  scheduler();
});
