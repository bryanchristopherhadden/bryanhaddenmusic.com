import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
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
    <div>
      <div>
        <Navigation onNavClick={handleNavClick} activeSection={activeSection} />
        {activeSection === "home" && <Header data={landingPageData.Header} />}
        {activeSection === "contact" && (
          <Contact data={landingPageData.Contact} />
        )}
      </div>
      <div id="footer" style={{ display: "none" }}>
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
