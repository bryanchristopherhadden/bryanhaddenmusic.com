"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface BodyClassProviderProps {
  children: React.ReactNode;
}

export default function BodyClassProvider({ children }: BodyClassProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Remove any existing site classes
    document.body.classList.remove('music-site', 'tech-site');
    
    // Apply appropriate class based on pathname
    if (pathname.startsWith('/music') || pathname === '/') {
      document.body.classList.add('music-site');
    } else if (pathname.startsWith('/tech')) {
      document.body.classList.add('tech-site');
    }
  }, [pathname]);

  return <>{children}</>;
}
