"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  mode?: 'music' | 'tech';
  hideOnHomepage?: boolean;
}

const Navigation = ({ mode, hideOnHomepage = false }: NavigationProps): JSX.Element => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isWideScreen, setIsWideScreen] = useState<boolean>(true);
  
  // Auto-detect mode based on pathname if not provided
  const currentMode = mode || (pathname.startsWith('/tech') ? 'tech' : 'music');

  useEffect(() => {
    setIsMounted(true);

    setIsWideScreen(window.innerWidth < 999);

    const handleScroll = (): void => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = (): void => {
      setIsWideScreen(window.innerWidth > 999);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  // Hide navigation on homepage if hideOnHomepage is true
  if (hideOnHomepage && pathname === '/') {
    return <></>;
  }

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div
        className={isMounted && isWideScreen ? "container" : "container-fluid"}
      >
        <Link href="/" className="navbar-brand">
          <span>Bryan Hadden</span>
          <span>{currentMode === 'tech' ? 'FullStack Developer' : 'Music Producer'}</span>
        </Link>
        <ul className="nav">
          {currentMode === 'music' ? (
            <>
              <li className={isActive("/") ? "active" : ""}>
                <Link href="/">Home</Link>
              </li>
              <li className={isActive("/music/about") ? "active" : ""}>
                <Link href="/music/about">Music Producer Bio</Link>
              </li>
              <li>
                <Link href="/tech">Tech Site</Link>
              </li>
            </>
          ) : (
            <>
              <li className={isActive("/tech") ? "active" : ""}>
                <Link href="/tech">Home</Link>
              </li>
              <li className={isActive("/tech/resume") ? "active" : ""}>
                <Link href="/tech/resume">Resume</Link>
              </li>
              <li className={isActive("/tech/portfolio") ? "active" : ""}>
                <Link href="/tech/portfolio">Portfolio</Link>
              </li>
              <li>
                <Link href="/music">Music Site</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 