"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = (): JSX.Element => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isWideScreen, setIsWideScreen] = useState<boolean>(true);

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

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div
        className={isMounted && isWideScreen ? "container" : "container-fluid"}
      >
        <Link href="/" className="navbar-brand">
          <span>Bryan Hadden</span>
          <span>{pathname === '/resume' || pathname === '/portfolio' ? 'FullStack Developer' : 'Music Producer'}</span>
        </Link>
        <ul className="nav">
          <li className={isActive("/") ? "active" : ""}>
            <Link href="/">Music Home</Link>
          </li>
          <li className={isActive("/about") ? "active" : ""}>
            <Link href="/about">Music Producer Bio</Link>
          </li>
          <li className={isActive("/resume") ? "active" : ""}>
            <Link href="/resume">Resume</Link>
          </li>
          <li className={isActive("/portfolio") ? "active" : ""}>
            <Link href="/portfolio">Portfolio</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 