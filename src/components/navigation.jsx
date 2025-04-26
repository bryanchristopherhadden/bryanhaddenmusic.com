"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const Navigation = ({ setSegment }) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "contact" },
  ];

  // Initialize with default value
  const [activeSegment, setActiveSegment] = useState("/");

  // Update the activeSegment based on pathname
  useEffect(() => {
    const path = pathname === "/" ? "/" : pathname.replace(/^\/+/, "");
    setActiveSegment(path);
    if (setSegment) setSegment(path);
  }, [pathname, setSegment]);

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
        <div className="collapse navbar-collapse">
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
                    const href = item.href.toLowerCase();
                    router.push(href);
                    setActiveSegment(href);
                    if (setSegment) setSegment(href);
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
