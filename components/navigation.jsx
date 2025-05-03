'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to potentially change navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if a link is active based on the current path
  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link href="/" className="navbar-brand">
          <span>Bryan Hadden</span>
          <span>Music Producer</span>
        </Link>
        
        <ul className="nav">
          <li className={isActive('/') ? 'active' : ''}>
            <Link href="/">Home</Link>
          </li>
          <li className={isActive('/about') ? 'active' : ''}>
            <Link href="/about">About</Link>
          </li>
          <li className={isActive('/contact') ? 'active' : ''}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
