import React, { useState } from "react";

export const Navigation = () => {
  const [activeItem, setActiveItem] = useState("HOME");

  const menuItems = [
    { name: "HOME", href: "home" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed flex"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            <span style={{ color: "#6372ff " }}>Bryan Hadden</span>{" "}
            <span style={{ fontSize: "16px" }}>
              Songwriter <span style={{ color: "#6372ff " }}>|</span> Producer
            </span>
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={activeItem === item.name ? "active" : ""}
              >
                <a
                  href={item.href}
                  className="page-scroll"
                  onClick={() => setActiveItem(item.name)}
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
