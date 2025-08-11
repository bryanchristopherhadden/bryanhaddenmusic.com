import React from 'react'
import PortfolioClient from './components/PortfolioClient'

export const metadata = {
  title: "Bryan Hadden | Full Stack Developer Portfolio",
  tagline: "Full Stack Developer | Lead Engineer | React, Node.js, TypeScript",
  openGraph: {
    title: "Bryan Hadden | Full Stack Developer Portfolio",
    description:
      "Full Stack Developer portfolio showcasing projects built with React, Node.js, TypeScript, and modern web technologies. View my work and get in touch for collaboration.",
    url: "https://bryanhadden.info/portfolio",
    siteName: "Bryan Hadden - Full Stack Developer Portfolio",
    images: [
      {
        url: "/me2.jpeg",
        width: 1200,
        height: 630,
        alt: "Bryan Hadden - Full Stack Developer Portfolio",
      },
    ],
  },
  description:
    "Full Stack Developer portfolio showcasing projects built with React, Node.js, TypeScript, and modern web technologies. View my work and get in touch for collaboration.",
  keywords: [
    "full stack developer",
    "portfolio",
    "lead engineer",
    "react",
    "node.js",
    "typescript",
    "next.js",
    "frontend",
    "backend",
    "software engineer",
    "projects",
    "Bryan Hadden",
  ],
};

export default function Portfolio() {
  return <PortfolioClient />
} 