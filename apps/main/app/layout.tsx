import Navigation from './components/Navigation'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react";
import ClientBodyWrapper from './ClientBodyWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Bryan Hadden | Choose Your Journey",
  description: "Bryan Hadden - Music Producer and Full Stack Developer. Choose between music and tech experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ClientBodyWrapper className={inter.className}>
        <Navigation hideOnHomepage={true} />
        {children}
        <Analytics />
      </ClientBodyWrapper>
    </html>
  );
}
