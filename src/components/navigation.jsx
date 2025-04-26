"use client";

import { useState, useEffect } from "react";

const Navigation = ({ setSegment }) => {
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "contact" },
  ];

  // Initialize with default value to prevent server-rendering issues
  const [activeSegment, setActiveSegment] = useState("/");

  // Update the activeSegment based on window.location after component mounts (client-side only)
  useEffect(() => {
    const path = window.location.pathname.replace(/^\/+/, "");
    setActiveSegment(path || "/");
    if (setSegment) setSegment(path || "/");
  }, [setSegment]);

  useEffect(() => {
    // Update segment state when URL changes
    const handleLocationChange = () => {
      const path = window.location.pathname.replace(/^\/+/, "");
      setActiveSegment(path || "/");
      if (setSegment) setSegment(path || "/");
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, [setSegment]);

  return (
    <nav id="menu" className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <div className="navbar-brand">
            <span>Bryan Hadden</span>
            <span>
              Songwriter <span>|</span> Producer
            </span>
          </div>
        </div>
        <div className="collapse navbar-collapse" >
          <ul className="nav navbar-nav navbar-right">
            {menuItems.map((item) => (
              <li
              style={{ listStyleType: "none" }}
                key={item.name}
                className={
                  activeSegment === item.href ||
                  (activeSegment === "/" && item.href === "/")
                    ? "active"
                    : ""
                }
              >
                <a
                  href={`${item.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSegment(item.href.toLowerCase());
                    if (setSegment) setSegment(item.href.toLowerCase());
                    window.history.pushState({}, "", item.href);
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
