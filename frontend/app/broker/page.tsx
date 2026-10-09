'use client';

import { FormEvent, useState } from 'react';

export default function BrokerPage() {
  const [appId, setAppId] = useState('1');
  const [token, setToken] = useState('');
  const [serverUrl, setServerUrl] = useState('wss://ws.deriv.com/websockets/v3');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Not connected');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/deriv/authorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, appId, serverUrl })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? 'Authorization failed');
      }

      setStatus(`Connected: ${data.data?.email ?? 'authorized user'}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
      setStatus('Connection failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="broker-grid">
        <div className="broker-card">
          <h2>Connect broker</h2>
          <p>Connect your Deriv account using your app ID and auth token.</p>

          <form className="broker-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="appId">App ID</label>
              <input id="appId" value={appId} onChange={(e) => setAppId(e.target.value)} />
            </div>

            <div className="form-row">
              <label htmlFor="serverUrl">WebSocket URL</label>
              <input id="serverUrl" value={serverUrl} onChange={(e) => setServerUrl(e.target.value)} />
            </div>

            <div className="form-row">
              <label htmlFor="token">Deriv token</label>
              <input
                id="token"
                type="password"
                placeholder="Paste your Deriv auth token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>

            <button className="primary-button-wide" type="submit" disabled={loading}>
              {loading ? 'Connecting...' : 'Connect Deriv'}
            </button>
          </form>
        </div>

        <div className="broker-card">
          <h2>Broker status</h2>
          <div className="status-box">{status}</div>
          <p className="form-hint">
            Keep tokens in your local environment and never commit them to GitHub.
          </p>
          {error ? <p className="form-hint">{error}</p> : null}
        </div>
      </section>
    </main>
  );
}
