import { useState, useEffect } from "react";

export const Navigation = ({ setSegment }) => {
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "contact" },
  ];

  const [activeSegment, setActiveSegment] = useState(() => {
    // Get current path from window location
    const path = window.location.pathname.replace(/^\/+/, "");
    return path || "/";
  });

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
          <button
            type="button"
            className="navbar-toggle collapsed flex"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <div className="navbar-brand">
            <span>Bryan Hadden</span>
            <span>
              Songwriter <span>|</span> Producer
            </span>
          </div>
        </div>
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            {menuItems.map((item) => (
              <li
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
