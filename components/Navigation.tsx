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

    // Set initial screen width
    setIsWideScreen(window.innerWidth < 999);

    // Handle scroll events
    const handleScroll = (): void => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Handle resize events
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
          <span>Music Producer</span>
        </Link>
        <ul className="nav">
          <li className={isActive("/") ? "active" : ""}>
            <Link href="/">Home</Link>
          </li>
          <li className={isActive("/about") ? "active" : ""}>
            <Link href="/about">About</Link>
          </li>
          <li className={isActive("/tech") ? "active" : ""}>
            <Link href="/tech">Tech</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 