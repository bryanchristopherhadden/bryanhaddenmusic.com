import Navigation from '../components/Navigation'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react";
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Bryan Hadden Music | Music Producer",
  description:
    "Professional music production services by Bryan Hadden. Let's make your music more like you.",
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
      <head>
        <title>Bryan Hadden Music</title>
        <meta
          name="description"
          content="Songwriter | Producer - Make your music more like you."
        />
      </head>
      <body className={inter.className}>
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

