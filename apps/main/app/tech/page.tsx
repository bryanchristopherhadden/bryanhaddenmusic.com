import React from 'react'
import PortfolioClient from './components/PortfolioClient'
import {
  TECH_PORTFOLIO_DESCRIPTION,
  TECH_PORTFOLIO_SITE_NAME,
  TECH_PORTFOLIO_TITLE,
  TECH_TAGLINE,
} from './copy'

export const metadata = {
  title: TECH_PORTFOLIO_TITLE,
  tagline: TECH_TAGLINE,
  openGraph: {
    title: TECH_PORTFOLIO_TITLE,
    description: TECH_PORTFOLIO_DESCRIPTION,
    url: "https://bryanhadden.info/portfolio",
    siteName: TECH_PORTFOLIO_SITE_NAME,
    images: [
      {
        url: "/me2.jpeg",
        width: 1200,
        height: 630,
        alt: TECH_PORTFOLIO_SITE_NAME,
      },
    ],
  },
  description: TECH_PORTFOLIO_DESCRIPTION,
  keywords: [
    "Fullstack TypeScript/Python Engineer",
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