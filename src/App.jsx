import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import Home from "./components/header";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import "./App.css";

const config = {};

const App = () => {
  const [landingPageData, setLandingPageData] = useState(config);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div id="app">
      <div className="page">
        <Navigation onNavClick={handleNavClick} activeSection={activeSection} />
        {activeSection === "home" && <Home data={landingPageData.Header} />}
        {activeSection === "contact" && (
          <Contact data={landingPageData.Contact} />
        )}
      </div>
      <div className="footer" style={{ display: "none" }}>
        <div className="container text-center">
          <p>
            &copy; 2023 Issaaf Kattan React Land Page Template. Design by{" "}
            <a href="http://www.templatewire.com" rel="nofollow">
              TemplateWire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
