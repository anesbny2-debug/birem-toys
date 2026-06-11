import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Birem Toys Admin',
  description: 'Admin Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
