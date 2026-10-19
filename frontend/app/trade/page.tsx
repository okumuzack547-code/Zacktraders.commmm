import Link from 'next/link';

export default function TradePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Trade</p>
          <h1>Paper trading desk</h1>
          <p className="subtitle">
            Open demo positions, review order flow, and monitor account health with a simple trading workspace.
          </p>
        </div>
        <div className="hero-actions">
          <Link href="/broker" className="secondary-button-link">
            <button className="primary-button" type="button">Connect broker</button>
          </Link>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Account</span>
          <strong>Demo</strong>
        </div>
        <div className="stat-card">
          <span>Balance</span>
          <strong>$10,000</strong>
        </div>
        <div className="stat-card">
          <span>Open</span>
          <strong>3</strong>
        </div>
        <div className="stat-card">
          <span>P/L</span>
          <strong>+$420</strong>
        </div>
      </section>

      <section className="cards-grid">
        <article className="info-card">
          <h2>Buy ticket</h2>
          <p>Place a bullish demo order with risk limits, expiry selection, and stake controls.</p>
        </article>
        <article className="info-card">
          <h2>Sell ticket</h2>
          <p>Short a contract with stop and limit controls for a clean paper trading workflow.</p>
        </article>
        <article className="info-card">
          <h2>Watchlist</h2>
          <p>Monitor contract prices, volume, and short-term momentum on active symbols.</p>
        </article>
      </section>
    </main>
  );
}
