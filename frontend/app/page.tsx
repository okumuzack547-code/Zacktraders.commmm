const stats = [
  { label: 'Demo balance', value: '$10,000' },
  { label: 'Open positions', value: '3' },
  { label: 'Win rate', value: '66%' },
  { label: 'Alerts', value: '2' }
];

const cards = [
  { title: 'Portfolio', text: 'Overview of balances, open positions, and account health.' },
  { title: 'Orders', text: 'Track pending, active, and filled orders in one place.' },
  { title: 'Wallets', text: 'Manage demo cash, deposits, withdrawals, and balances.' }
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Tradescheme</p>
          <h1>Options trading platform MVP</h1>
          <p className="subtitle">
            A ready-to-expand scaffold for demo trading workflows, wallet operations, and a future broker integration layer.
          </p>
        </div>
        <button className="primary-button">Open demo account</button>
      </section>

      <section className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </section>

      <section className="cards-grid">
        {cards.map((card) => (
          <article key={card.title} className="info-card">
            <h2>{card.title}</h2>
            <p>{card.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
