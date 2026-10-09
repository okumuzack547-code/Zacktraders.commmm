import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  const { amount, currency = 'USD', userId } = req.body ?? {};

  if (!userId || !amount) {
    return res.status(400).json({ error: 'userId and amount are required' });
  }

  return res.status(202).json({
    id: 'deposit-001',
    userId,
    amount,
    currency,
    status: 'PENDING',
    provider: 'demo-provider',
    message: 'Deposit received and queued for review.'
  });
});

export default router;
