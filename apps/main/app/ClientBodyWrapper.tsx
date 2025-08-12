"use client";

import { usePathname } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ClientBodyWrapperProps {
  children: ReactNode;
  className: string;
}

export default function ClientBodyWrapper({ children, className }: ClientBodyWrapperProps) {
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

  return <body className={className}>{children}</body>;
}
