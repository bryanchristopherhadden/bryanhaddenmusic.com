import { Metadata } from 'next';

const MUSIC_TITLE = "Professional Instrumental Beats for Sale | Bryan Hadden Music";
const MUSIC_SITE_NAME = "Bryan Hadden Music";
const MUSIC_TWITTER_DESCRIPTION =
  "Buy high-quality instrumental music and beats. Hip-hop, RnB, trap, house instrumentals for artists.";
const MUSIC_OPEN_GRAPH_DESCRIPTION =
  `${MUSIC_TWITTER_DESCRIPTION} Instant download with exclusive licensing.`;
const MUSIC_DESCRIPTION =
  `${MUSIC_OPEN_GRAPH_DESCRIPTION} Professional producer beats.`;

export const metadata: Metadata = {
  title: MUSIC_TITLE,
  description: MUSIC_DESCRIPTION,
  keywords: "instrumental beats, instrumental music, buy beats, hip hop instrumentals, trap beats, producer beats, rnb instrumentals, house beats, exclusive beats, beat licensing",
  openGraph: {
    title: MUSIC_TITLE,
    description: MUSIC_OPEN_GRAPH_DESCRIPTION,
    url: "https://bryanhadden.info/music",
    siteName: MUSIC_SITE_NAME,
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
    title: MUSIC_TITLE,
    description: MUSIC_TWITTER_DESCRIPTION,
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
