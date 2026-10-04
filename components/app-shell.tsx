import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'AI Ad Creator', href: '/creator' },
  { label: 'AI Poster Studio', href: '/poster-studio' },
  { label: 'Campaigns', href: '/campaigns' },
  { label: 'Social Manager', href: '/social-manager' },
  { label: 'Marketing Assistant', href: '/marketing-assistant' },
  { label: 'Admin', href: '/admin' },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <div className="brand-mark">A</div>
            <span>AI Ads Runner</span>
          </div>

          <nav className="nav-menu" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-pill ${pathname === item.href ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="user-strip">
            <span className="status-badge">Free plan</span>
            <div className="profile-chip">AR</div>
          </div>
        </div>
      </header>

      <main className="main">{children}</main>
    </div>
  );
}
