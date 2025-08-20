import Navigation from './components/Navigation'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ClientBodyWrapper from './ClientBodyWrapper';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

// Custom theme that respects your existing design
const theme = createTheme({
  fontFamily: 'Roboto, sans-serif',
  primaryColor: 'blue',
  colors: {
    'music-primary': ['#F5F7FA', '#E8F1F8', '#D4E6F1', '#A7D0E4', '#7AB8D3', '#4D9FC1', '#3F8B8A', '#357A7D', '#2C6870', '#235763'],
    'music-accent': ['#FEF9E7', '#FCF3CF', '#F9E79F', '#F7DC6F', '#F4D03F', '#F1C40F', '#D6A24A', '#B7950B', '#9A7D0A', '#7D6608'],
  },
  components: {
    Card: {
      defaultProps: {
        shadow: 'md',
        radius: 'md',
      },
    },
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
});

export const metadata = {
  title: "Bryan Hadden | Choose Your Journey",
  description: "Bryan Hadden - Music Producer and Full Stack Developer. Choose between music and tech experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ClientBodyWrapper className={inter.className}>
        <MantineProvider theme={theme}>
          <Notifications />
          <Navigation hideOnHomepage={true} />
          {children}
          <Analytics />
          <SpeedInsights />
        </MantineProvider>
      </ClientBodyWrapper>
    </html>
  );
}
