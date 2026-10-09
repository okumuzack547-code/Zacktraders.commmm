import * as WebSocket from 'ws';

export interface DerivConfig {
  appId: string;
  serverUrl?: string;
}

export interface DerivAuthorizeResponse {
  account_list?: Array<{ loginid: string; currency?: string; is_disabled?: number; is_virtual?: number }>;
  email?: string;
  user_id?: number;
  error?: { message: string };
}

export interface BalanceResponse {
  balance: number;
  currency: string;
  loginid: string;
}

export class DerivAdapter {
  private socket: WebSocket.WebSocket | null = null;
  private config: DerivConfig;
  private nextRequestId = 1;
  private pending = new Map<number, { resolve: (value: any) => void; reject: (reason?: unknown) => void }>();

  constructor(config: DerivConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return;
    }

    const wsUrl = this.config.serverUrl ?? 'wss://ws.deriv.com/websockets/v3';

    return new Promise((resolve, reject) => {
      try {
        const socket = new WebSocket.WebSocket(wsUrl);
        this.socket = socket;

        socket.on('open', () => resolve());

        socket.on('message', (data) => {
          try {
            const payload = JSON.parse(data.toString());
            const reqId = payload.req_id;
            if (typeof reqId === 'number' && this.pending.has(reqId)) {
              const pending = this.pending.get(reqId)!;
              this.pending.delete(reqId);
              pending.resolve(payload);
            }
          } catch (error) {
            console.error('Unable to parse Deriv message:', error);
          }
        });

        socket.on('error', (error) => {
          console.error('Deriv websocket error:', error);
          reject(error);
        });

        socket.on('close', () => {
          this.socket = null;
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect(): void {
    this.socket?.close();
    this.socket = null;
  }

  private async send<T>(request: Record<string, unknown>): Promise<T> {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      await this.connect();
    }

    const reqId = this.nextRequestId++;
    const payload = { ...request, req_id: reqId, app_id: Number(this.config.appId || 1) };

    return new Promise<T>((resolve, reject) => {
      this.pending.set(reqId, { resolve, reject });

      const timeout = setTimeout(() => {
        if (this.pending.has(reqId)) {
          this.pending.delete(reqId);
          reject(new Error('Deriv request timed out'));
        }
      }, 30000);

      this.socket!.send(JSON.stringify(payload), (error) => {
        if (error) {
          clearTimeout(timeout);
          this.pending.delete(reqId);
          reject(error);
        }
      });
    });
  }

  async authorize(token: string): Promise<DerivAuthorizeResponse> {
    const response = await this.send<{ authorize?: DerivAuthorizeResponse; error?: { message: string } }>({
      authorize: token
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.authorize ?? {};
  }

  async getBalance(loginId?: string): Promise<BalanceResponse[]> {
    const response = await this.send<{ balance?: { balances?: BalanceResponse[]; error?: { message: string } } }>({
      balance: 1,
      ...(loginId ? { account: loginId } : {})
    });

    if (response.balance?.error) {
      throw new Error(response.balance.error.message);
    }

    return response.balance?.balances ?? [];
  }

  async getPortfolio(loginId?: string): Promise<any> {
    const response = await this.send<{ portfolio?: any; error?: { message: string } }>({
      portfolio: 1,
      ...(loginId ? { account: loginId } : {})
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.portfolio ?? [];
  }

  async buyContract(params: {
    amount: number;
    basis?: 'payout' | 'stake';
    contract_type: string;
    currency?: string;
    duration?: number;
    duration_unit?: 't' | 'm' | 'h' | 'd';
    symbol: string;
    account?: string;
  }): Promise<any> {
    const response = await this.send<{ buy?: any; error?: { message: string } }>({
      buy: 1,
      amount: params.amount,
      basis: params.basis ?? 'stake',
      contract_type: params.contract_type,
      currency: params.currency ?? 'USD',
      duration: params.duration ?? 1,
      duration_unit: params.duration_unit ?? 't',
      symbol: params.symbol,
      ...(params.account ? { account: params.account } : {})
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.buy ?? {};
  }
}

export default DerivAdapter;
