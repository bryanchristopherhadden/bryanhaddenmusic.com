import Navigation from '../components/Navigation'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react";
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Bryan Hadden Music | Music Producer",
  tagline: "Music Producer | Songwrite | Mixing, Mastering",
  openGraph: {
    title: "Bryan Hadden Music | Music Producer",
    description:
      "Professional music production services by Bryan Hadden. Let's make your music sound more like you.",
    url: "https://bryanhaddenmusic.com",
    siteName: "Bryan Hadden Music",
    images: [
      {
        url: "/me2.jpeg",
        width: 1200,
        height: 630,
        alt: "Bryan Hadden Music",
      },
    ],
  },
  description:
    "Professional music production services by Bryan Hadden. Let's make your music sound more like you.",
  keywords: [
    "music",
    "producer",
    "studio",
    "recording",
    "mixing",
    "mastering",
    "Bryan Hadden",
  ],
};

export default function RootLayout({ children }) {
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

