"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    // Set initial screen width
    setIsWideScreen(window.innerWidth < 999);

    // Handle scroll events
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Handle resize events
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 999);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isActive = (path) => {
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
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
