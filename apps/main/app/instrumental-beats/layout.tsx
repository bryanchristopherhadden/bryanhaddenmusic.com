import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Buy Professional Instrumental Beats Online | Hip-Hop, Trap, RnB Instrumentals",
  description: "Shop premium instrumental beats and music from professional producer Bryan Hadden. Hip-hop instrumentals, trap beats, RnB beats with instant download. Exclusive and lease licensing available.",
  keywords: "buy instrumental beats, instrumental music, hip hop instrumentals, trap beats, rnb beats, producer beats, exclusive beats, lease beats, buy beats online, instrumental music download",
  openGraph: {
    title: "Buy Professional Instrumental Beats Online | Hip-Hop, Trap, RnB",
    description: "Shop premium instrumental beats and music. Hip-hop instrumentals, trap beats, RnB beats with instant download. Exclusive and lease licensing available.",
    url: "https://bryanhadden.info/instrumental-beats",
    siteName: "Bryan Hadden Music - Instrumental Beats",
    images: [
      {
        url: "/me2.jpeg",
        width: 1200,
        height: 630,
        alt: "Bryan Hadden - Professional Beat Producer",
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Buy Professional Instrumental Beats Online",
    description: "Shop premium instrumental beats and music. Hip-hop instrumentals, trap beats, RnB beats with instant download.",
    images: ["/me2.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://bryanhadden.info/instrumental-beats",
  },
};

export default function InstrumentalBeatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
