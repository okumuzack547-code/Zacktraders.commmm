import { Router, type Request, type Response } from 'express';
import DerivAdapter from '../adapters/deriv.js';

const router = Router();
const derivAdapter = new DerivAdapter({
  appId: process.env.DERIV_APP_ID ?? '1',
  serverUrl: process.env.DERIV_SERVER_URL ?? 'wss://ws.deriv.com/websockets/v3'
});

router.get('/health', async (_req, res: Response) => {
  try {
    await derivAdapter.connect();
    return res.json({ ok: true, provider: 'deriv', status: 'connected' });
  } catch (error) {
    return res.status(503).json({
      ok: false,
      provider: 'deriv',
      status: 'disconnected',
      error: error instanceof Error ? error.message : 'connection failed'
    });
  }
});

router.post('/authorize', async (req: Request, res: Response) => {
  try {
    const token = (req.body?.token ?? process.env.DERIV_API_TOKEN ?? '').toString().trim();
    if (!token) {
      return res.status(400).json({ error: 'Deriv auth token is required' });
    }

    const auth = await derivAdapter.authorize(token);
    return res.json({ ok: true, data: auth });
  } catch (error) {
    return res.status(401).json({ ok: false, error: error instanceof Error ? error.message : 'Authorization failed' });
  }
});

router.get('/balance', async (req: Request, res: Response) => {
  try {
    const loginId = (req.query.loginid as string | undefined) ?? undefined;
    const balance = await derivAdapter.getBalance(loginId);
    return res.json({ ok: true, data: balance });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error instanceof Error ? error.message : 'Balance lookup failed' });
  }
});

router.get('/portfolio', async (req: Request, res: Response) => {
  try {
    const loginId = (req.query.loginid as string | undefined) ?? undefined;
    const portfolio = await derivAdapter.getPortfolio(loginId);
    return res.json({ ok: true, data: portfolio });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error instanceof Error ? error.message : 'Portfolio lookup failed' });
  }
});

router.post('/buy', async (req: Request, res: Response) => {
  try {
    const { amount, basis, contract_type, currency, duration, duration_unit, symbol, account } = req.body ?? {};

    if (!amount || !contract_type || !symbol) {
      return res.status(400).json({ error: 'amount, contract_type, and symbol are required' });
    }

    const result = await derivAdapter.buyContract({
      amount,
      basis,
      contract_type,
      currency,
      duration,
      duration_unit,
      symbol,
      account
    });

    return res.status(201).json({ ok: true, data: result });
  } catch (error) {
    return res.status(400).json({ ok: false, error: error instanceof Error ? error.message : 'Buy contract failed' });
  }
});

export default router;
