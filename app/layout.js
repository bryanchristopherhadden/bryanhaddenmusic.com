'use client'

import { Inter } from 'next/font/google'
import './globals.css'

// Import Navigation component
import Navigation from '@/components/navigation.jsx'
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ['latin'] })

// Note: metadata export is replaced with Head usage in client components
// This will be handled by the document head at runtime

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

