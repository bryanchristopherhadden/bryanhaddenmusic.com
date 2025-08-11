import { Navigation } from '@bryan-hadden/shared'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react";
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Bryan Hadden | Full Stack Developer",
  tagline: "Full Stack Developer | React | Node.js | TypeScript",
  openGraph: {
    title: "Bryan Hadden | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Node.js, and modern web technologies.",
    url: "https://tech.bryanhadden.info | http://localhost:3002/",
    siteName: "Bryan Hadden Tech",
    images: [
      {
        url: "/me2.jpeg",
        width: 1200,
        height: 630,
        alt: "Bryan Hadden",
      },
    ],
  },
  description:
    "Full Stack Developer specializing in React, Node.js, and modern web technologies.",
  keywords: [
    "full stack developer",
    "react",
    "node.js",
    "typescript",
    "javascript",
    "web development",
    "Bryan Hadden",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation mode="tech" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
