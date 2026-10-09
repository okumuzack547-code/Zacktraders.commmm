import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

import demoRouter from './routes/demo.js';
import depositRouter from './routes/deposits.js';
import derivRouter from './routes/deriv.js';
import withdrawalRouter from './routes/withdrawals.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ ok: true, service: 'tradescheme-backend', timestamp: new Date().toISOString() });
});

app.use('/api/demo', demoRouter);
app.use('/api/deposits', depositRouter);
app.use('/api/withdrawals', withdrawalRouter);
app.use('/api/deriv', derivRouter);

app.listen(port, () => {
  console.log(`Tradescheme backend listening on http://localhost:${port}`);
});
