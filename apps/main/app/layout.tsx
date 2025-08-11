import { Navigation } from '@bryan-hadden/shared'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react";
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Bryan Hadden | Music Producer & Full Stack Developer",
  description: "Bryan Hadden - Music Producer and Full Stack Developer portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
