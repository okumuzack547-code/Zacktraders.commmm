import { Router } from 'express';

const router = Router();

router.get('/accounts', (_, res) => {
  res.json({
    accounts: [
      {
        id: 'demo-account-001',
        userId: 'user-001',
        type: 'DEMO',
        balance: 10000,
        currency: 'USD',
        status: 'ACTIVE'
      }
    ]
  });
});

router.post('/accounts', (req, res) => {
  const { userId, type = 'DEMO', currency = 'USD' } = req.body ?? {};

  res.status(201).json({
    id: 'demo-account-created',
    userId,
    type,
    currency,
    balance: 10000,
    status: 'ACTIVE'
  });
});

router.get('/accounts/:id', (req, res) => {
  res.json({
    id: req.params.id,
    userId: 'user-001',
    type: 'DEMO',
    balance: 10000,
    currency: 'USD',
    status: 'ACTIVE'
  });
});

export default router;
