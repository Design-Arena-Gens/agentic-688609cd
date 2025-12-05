import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Elon Musk Interactive 3D Model',
  description: 'Explore a stylized interactive 3D visualization inspired by Elon Musk.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
