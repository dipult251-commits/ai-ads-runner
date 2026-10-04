import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <div className="brand-mark">A</div>
            <span>AI Ads Runner</span>
          </div>

          <nav className="nav-menu">
            <Link href="/auth/login" className="nav-pill">Login</Link>
            <Link href="/auth/signup" className="nav-pill">Signup</Link>
          </nav>

          <div className="user-strip">
            <span className="status-badge">Demo mode</span>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <div className="panel hero-card">
            <span className="kicker">Create. Promote. Grow.</span>
            <h1>Turn product ideas into high-converting ad campaigns.</h1>
            <p>
              AI Ads Runner gives you ad generation, campaign planning, poster ideation, social content, and AI-powered strategy in one place.
            </p>
            <div className="hero-actions">
              <Link href="/auth/signup" className="primary-btn">Get started</Link>
              <Link href="/auth/login" className="secondary-btn">Login</Link>
            </div>
          </div>

          <div className="panel quick-facts">
            <div className="stat-highlight">
              <span className="muted">Campaign health</span>
              <strong>91%</strong>
              <span className="muted">Strong growth momentum</span>
            </div>
            <div className="stat-highlight">
              <span className="muted">AI strategy score</span>
              <strong>8.7/10</strong>
              <span className="muted">Precise budget + audience fit</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
