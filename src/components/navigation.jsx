import React from "react";

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
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
            <span style={{ color: '#6372ff ' }}>
              OI
            </span>
            {' '}
            <span style={{ fontSize: "16px" }}>
              Songwriter <span style={{ color: '#6372ff ' }}>|</span> Producer
            </span>
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Request Services
              </a>
            </li>
            <li>
              <a href="#music" className="page-scroll">
                Music
              </a>
            </li>
            <li>
              <a href="#voice-acting" className="page-scroll">
                Voice Acting
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
