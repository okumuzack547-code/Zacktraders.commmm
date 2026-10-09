import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  const { amount, currency = 'USD', userId, walletId } = req.body ?? {};

  if (!userId || !amount) {
    return res.status(400).json({ error: 'userId and amount are required' });
  }

  return res.status(202).json({
    id: 'withdrawal-001',
    userId,
    walletId,
    amount,
    currency,
    status: 'PENDING',
    message: 'Withdrawal request received and queued for review.'
  });
});

export default router;
