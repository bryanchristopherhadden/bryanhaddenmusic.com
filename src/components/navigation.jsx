import { useEffect } from "react";

export const Navigation = ({ segment, setSegment }) => {
  const menuItems = [
    { name: "Home", href: "" },
    { name: "Contact", href: "contact" },
  ];

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
                className={segment === item.href.toLowerCase() ? "active" : ""}
              >
                <a
                  href={`${item.href}`}
                  onClick={() => setSegment(item.href.toLowerCase())}
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
