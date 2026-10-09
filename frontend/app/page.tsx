const metrics = [
  { label: 'Broker', value: 'Deriv' },
  { label: 'Account', value: 'Demo' },
  { label: 'Balance', value: '$10,000' },
  { label: 'Positions', value: '3' }
];

const panels = [
  { title: 'Portfolio', copy: 'Monitor live account health, open positions, and recent trading activity.' },
  { title: 'Orders', copy: 'Review queued orders, recent fills, and pending contract actions.' },
  { title: 'Wallets', copy: 'Track cash balance, deposits, withdrawals, and settlement activity.' }
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Tradescheme</p>
          <h1>Broker-connected trading dashboard</h1>
          <p className="subtitle">
            A live-ready scaffold for demo trading workflows connected to a Deriv API integration layer.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-button">Open demo account</button>
          <button className="secondary-button">Connect broker</button>
        </div>
      </section>

      <section className="stats-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="stat-card">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </section>

      <section className="cards-grid">
        {panels.map((panel) => (
          <article key={panel.title} className="info-card">
            <h2>{panel.title}</h2>
            <p>{panel.copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
