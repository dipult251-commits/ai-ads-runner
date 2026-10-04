import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Ads Runner',
  description: 'Create. Promote. Grow.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
