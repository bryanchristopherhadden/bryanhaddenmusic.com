import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Professional Instrumental Beats for Sale | Bryan Hadden Music",
  description: "Buy high-quality instrumental music and beats. Hip-hop, RnB, trap, house instrumentals for artists. Instant download with exclusive licensing. Professional producer beats.",
  keywords: "instrumental beats, instrumental music, buy beats, hip hop instrumentals, trap beats, producer beats, rnb instrumentals, house beats, exclusive beats, beat licensing",
  openGraph: {
    title: "Professional Instrumental Beats for Sale | Bryan Hadden Music",
    description: "Buy high-quality instrumental music and beats. Hip-hop, RnB, trap, house instrumentals for artists. Instant download with exclusive licensing.",
    url: "https://bryanhadden.info/music",
    siteName: "Bryan Hadden Music",
    images: [
      {
        url: "/me2.jpeg",
        width: 1200,
        height: 630,
        alt: "Bryan Hadden - Professional Beat Producer",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Professional Instrumental Beats for Sale | Bryan Hadden Music",
    description: "Buy high-quality instrumental music and beats. Hip-hop, RnB, trap, house instrumentals for artists.",
    images: ["/me2.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://bryanhadden.info/music",
  },
};

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

