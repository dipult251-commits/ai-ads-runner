'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export function LandingPage() {
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
            <h1>Launch ad campaigns with AI built for growth.</h1>
            <p>
              AI Ads Runner helps teams generate ad copy, posters, campaign plans, mobile-ready social media content,
              and smarter targeting recommendations from one dashboard.
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
              <span className="muted">Strong momentum this quarter</span>
            </div>
            <div className="stat-highlight">
              <span className="muted">AI strategy score</span>
              <strong>8.7/10</strong>
              <span className="muted">Audience + budget fit</span>
            </div>
          </div>
        </section>

        <section className="grid grid-4">
          {[
            { label: 'Total campaigns', value: '24', detail: '+6 this month' },
            { label: 'Active campaigns', value: '11', detail: '45% running' },
            { label: 'Total ads created', value: '82', detail: '+18 this week' },
            { label: 'Performance', value: '4.6%', detail: 'CTR growth' },
          ].map((stat) => (
            <div key={stat.label} className="panel metric-card">
              <div className="metric-header">
                <span className="muted">{stat.label}</span>
                <span className="metric-badge">Live</span>
              </div>
              <div className="metric-value">{stat.value}</div>
              <div className="metric-label">{stat.detail}</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export function DashboardPage() {
  return (
    <AppShell>
      <div className="section-title">
        <h2>Dashboard</h2>
        <span className="pill">Updated just now</span>
      </div>

      <section className="grid grid-4">
        {[
          { label: 'Total campaigns', value: '24' },
          { label: 'Active campaigns', value: '11' },
          { label: 'Ads created', value: '82' },
          { label: 'CTR growth', value: '4.6%' },
        ].map((item) => (
          <div key={item.label} className="panel metric-card">
            <div className="metric-header">
              <span className="muted">{item.label}</span>
              <span className="metric-badge">Live</span>
            </div>
            <div className="metric-value">{item.value}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-2" style={{ marginTop: 24 }}>
        <div className="panel card">
          <h3>Recent campaigns</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Budget</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Summer Glow Launch</td>
                <td>$1200</td>
                <td><span className="status active">Active</span></td>
              </tr>
              <tr>
                <td>Metro Mobile Bundle</td>
                <td>$950</td>
                <td><span className="status draft">Draft</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="panel card">
          <h3>Recent activities</h3>
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-dot" />
              <div>
                <strong>Ad concept generated</strong>
                <p className="muted">New campaign copy created for skincare launch.</p>
              </div>
            </div>
            <div className="timeline-item">
              <span className="timeline-dot" />
              <div>
                <strong>Budget review complete</strong>
                <p className="muted">Recommended $900 budget for stable reach.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

export function AdCreatorPage() {
  const [productName, setProductName] = useState('UrbanGlow Serum');
  const [language, setLanguage] = useState('en');
  const [platform, setPlatform] = useState('facebook');
  const [brief, setBrief] = useState('Premium skincare for wellness-conscious buyers');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    headline: string;
    description: string;
    caption: string;
    hashtags: string[];
  }>(null);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName, language, platform, brief }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Generation failed');
      setResult(data);
      toast.success('Ad copy created successfully');
    } catch (error: any) {
      toast.error(error.message || 'Unable to generate ad');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <Toaster />
      <div className="section-title">
        <h2>AI Ad Creator</h2>
        <span className="pill">English + Hindi</span>
      </div>

      <section className="grid grid-2">
        <div className="panel card">
          <div className="form-grid">
            <div className="field">
              <label>Product name</label>
              <input value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div className="field">
              <label>Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
            <div className="field">
              <label>Platform</label>
              <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>
            <div className="field">
              <label>Audience brief</label>
              <input value={brief} onChange={(e) => setBrief(e.target.value)} />
            </div>
          </div>

          <div className="hero-actions" style={{ marginTop: 18 }}>
            <button className="primary-btn" onClick={generate} disabled={loading}>
              {loading ? 'Generating...' : 'Generate ad'}
            </button>
            <button className="ghost-btn">Save draft</button>
          </div>
        </div>

        <div className="panel card">
          <h3>Generated output</h3>
          {result ? (
            <div className="output-box">
              <h4>{result.headline}</h4>
              <p>{result.description}</p>
              <p>{result.caption}</p>
              <div className="hashtag-row">
                {result.hashtags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ) : (
            <div className="output-box">
              <p className="muted">Your generated ad content will appear here.</p>
            </div>
          )}
        </div>
      </section>
    </AppShell>
  );
}

export function PosterStudioPage() {
  const [title, setTitle] = useState('Luxury Skin Routine');
  const [theme, setTheme] = useState('Minimal');
  const [layout, setLayout] = useState('Square');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generatePoster = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/poster', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, theme, layout }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Poster generation failed');
      setResult(data.prompt || data.message || 'Poster concept created');
      toast.success('Poster plan generated');
    } catch (error: any) {
      toast.error(error.message || 'Unable to generate poster');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <Toaster />
      <div className="section-title">
        <h2>AI Poster Studio</h2>
        <span className="pill">Multiple templates</span>
      </div>

      <section className="grid grid-2">
        <div className="panel card">
          <div className="form-grid">
            <div className="field">
              <label>Poster title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="field">
              <label>Theme</label>
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option>Minimal</option>
                <option>Luxury</option>
                <option>Bold</option>
                <option>Festive</option>
              </select>
            </div>
            <div className="field">
              <label>Layout</label>
              <select value={layout} onChange={(e) => setLayout(e.target.value)}>
                <option>Square</option>
                <option>Landscape</option>
                <option>Portrait</option>
              </select>
            </div>
          </div>

          <div className="hero-actions" style={{ marginTop: 18 }}>
            <button className="primary-btn" onClick={generatePoster} disabled={loading}>
              {loading ? 'Generating...' : 'Generate poster'}
            </button>
            <button className="ghost-btn">Download mockup</button>
          </div>
        </div>

        <div className="panel card">
          <h3>Creative direction</h3>
          <div className="output-box">
            <p>{result || 'Your poster concept will appear here with theme, layout, and creative direction.'}</p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

export function CampaignManagerPage() {
  const [campaigns, setCampaigns] = useState([
    { name: 'Summer Glow Launch', budget: 1200, status: 'Active', schedule: 'Jun 15 – Jul 05' },
    { name: 'UrbanFit Essentials', budget: 950, status: 'Draft', schedule: 'Jul 02 – Jul 22' },
  ]);
  const [name, setName] = useState('Glow Up Weekend');
  const [budget, setBudget] = useState('800');
  const [schedule, setSchedule] = useState('Jul 12 – Jul 26');
  const [status, setStatus] = useState('Draft');

  const saveCampaign = () => {
    setCampaigns((current) => [
      ...current,
      { name, budget: Number(budget) || 0, status, schedule },
    ]);
    toast.success('Campaign saved');
  };

  return (
    <AppShell>
      <Toaster />
      <div className="section-title">
        <h2>AI Campaign Manager</h2>
        <span className="pill">Budget + schedule</span>
      </div>

      <section className="grid grid-2">
        <div className="panel card">
          <div className="form-grid">
            <div className="field">
              <label>Campaign name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
              <label>Budget</label>
              <input value={budget} onChange={(e) => setBudget(e.target.value)} />
            </div>
            <div className="field">
              <label>Schedule</label>
              <input value={schedule} onChange={(e) => setSchedule(e.target.value)} />
            </div>
            <div className="field">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Draft</option>
                <option>Active</option>
                <option>Paused</option>
              </select>
            </div>
          </div>

          <div className="hero-actions" style={{ marginTop: 18 }}>
            <button className="primary-btn" onClick={saveCampaign}>Save campaign</button>
            <button className="ghost-btn">Recommend budget</button>
          </div>
        </div>

        <div className="panel card">
          <h3>Saved campaigns</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Schedule</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((item) => (
                <tr key={`${item.name}-${item.schedule}`}>
                  <td>{item.name}</td>
                  <td>${item.budget}</td>
                  <td><span className={`status ${item.status.toLowerCase()}`}>{item.status}</span></td>
                  <td>{item.schedule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}

export function SocialManagerPage() {
  const [idea, setIdea] = useState('Launch a premium skincare bundle with a 20% introductory offer');
  const [platform, setPlatform] = useState('instagram');
  const [output, setOutput] = useState('');

  const generateContent = () => {
    const caption =
      platform === 'whatsapp'
        ? `WhatsApp promotion: ${idea} Share with your circle and enjoy a smart savings plan. #Offer #Growth`
        : platform === 'facebook'
          ? `Facebook post: ${idea}. Create a value-driven message, use a clear CTA, and keep your content simple. #Marketing #Performance`
          : `Instagram caption: ${idea}. Use a premium visual, engaging hook, and strong conversion messaging. #BrandLaunch #SocialGrowth`;

    setOutput(caption);
    toast.success('Social content generated');
  };

  return (
    <AppShell>
      <Toaster />
      <div className="section-title">
        <h2>Social Media Manager</h2>
        <span className="pill">FB • IG • WhatsApp</span>
      </div>

      <section className="grid grid-2">
        <div className="panel card">
          <div className="form-grid">
            <div className="field">
              <label>Campaign idea</label>
              <textarea value={idea} onChange={(e) => setIdea(e.target.value)} />
            </div>
            <div className="field">
              <label>Channel</label>
              <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>
          </div>

          <div className="hero-actions" style={{ marginTop: 18 }}>
            <button className="primary-btn" onClick={generateContent}>Generate content</button>
            <button className="ghost-btn">Download copy</button>
          </div>
        </div>

        <div className="panel card">
          <h3>Generated social copy</h3>
          <div className="output-box">
            <p>{output || 'Create channel-ready captions and promotional messages here.'}</p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

export function MarketingAssistantPage() {
  return (
    <AppShell>
      <div className="section-title">
        <h2>AI Marketing Assistant</h2>
        <span className="pill">Strategy + insights</span>
      </div>

      <section className="grid grid-2">
        <div className="panel card">
          <h3>Recommended audience</h3>
          <p>Working professionals age 25–40 looking for premium, convenience-first products.</p>
        </div>

        <div className="panel card">
          <h3>Suggested strategy</h3>
          <p>Lead with trust-building creative, retargeting, and offer-led content to improve CTR and conversion.</p>
        </div>

        <div className="panel card">
          <h3>Suggested budget</h3>
          <p>Start with $900–$1500 monthly and scale after the first 2–3 weeks of performance signal.</p>
        </div>

        <div className="panel card">
          <h3>Performance focus</h3>
          <p>Prioritize WhatsApp and Instagram for discovery, then retarget via Facebook for conversion.</p>
        </div>
      </section>
    </AppShell>
  );
}

export function AdminPanelPage() {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <AppShell>
      <div className="section-title">
        <h2>Admin Panel</h2>
        <span className="pill">Secure controls</span>
      </div>

      <section className="grid grid-2">
        <div className="panel card">
          <h3>Manage users</h3>
          <div className="list">
            <div className="list-item"><span>Raj Mehta</span><span className="status active">Admin</span></div>
            <div className="list-item"><span>Priya Shah</span><span className="status draft">Editor</span></div>
            <div className="list-item"><span>Aman Verma</span><span className="status paused">Viewer</span></div>
          </div>
        </div>

        <div className="panel card">
          <h3>AI features</h3>
          <div className="list">
            <div className="list-item"><span>Ad Generator</span><span className="status active">Enabled</span></div>
            <div className="list-item"><span>Poster Studio</span><span className="status active">Enabled</span></div>
            <div className="list-item"><span>Budget Planner</span><span className="status draft">Beta</span></div>
          </div>
        </div>
      </section>

      <section className="panel card" style={{ marginTop: 22 }}>
        <h3>Website settings</h3>
        <div className="settings-grid">
          <div className="field">
            <label>Site name</label>
            <input defaultValue="AI Ads Runner" />
          </div>
          <div className="field">
            <label>Default language</label>
            <select defaultValue="English">
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
          <div className="field">
            <label>AI mode</label>
            <select defaultValue="Hybrid">
              <option>Hybrid</option>
              <option>Manual review</option>
              <option>Automated</option>
            </select>
          </div>
        </div>

        <div className="hero-actions" style={{ marginTop: 18 }}>
          <button className="primary-btn" onClick={() => setShowConfirm(true)}>Save admin changes</button>
          <button className="ghost-btn">Manage subscription plans</button>
        </div>
      </section>

      {showConfirm ? (
        <div className="confirm-box" onClick={() => setShowConfirm(false)}>
          <div className="confirm-card" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm before publishing or spending</h3>
            <p className="muted">Before publishing content or spending a campaign budget, the system requires explicit confirmation. This prevents accidental launches.</p>
            <div className="confirm-actions">
              <button className="ghost-btn" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="primary-btn" onClick={() => setShowConfirm(false)}>Confirm</button>
            </div>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
