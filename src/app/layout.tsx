import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Birem Toys - متجر الألعاب',
  description: 'أفضل متجر ألعاب في الجزائر',
  keywords: 'ألعاب، تعليمية، أطفال، جزائر',
  openGraph: {
    type: 'website',
    url: 'https://biremtoys.dz',
    siteName: 'Birem Toys',
    title: 'Birem Toys',
    description: 'أفضل متجر ألعاب في الجزائر',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>🎁</text></svg>" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
