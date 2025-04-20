import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Contact } from "./components/contact";
import Home from "./components/home";

const App = () => {
  const config = {};
  const isMobile = window.innerWidth <= 900;
  const [segment, setSegment] = useState("");
  const [landingPageData, setLandingPageData] = useState(config);

  const renderContent = () => {
    const contentMap = {
      home: <Home data={landingPageData.Header} />,
      contact: <Contact data={landingPageData.Contact} />,
    };

    return contentMap[segment] || contentMap.home;
  };

  useEffect(() => {
    const path = window.location.pathname;
    const urlSegment = path.split("/").filter(Boolean)[0] || "";
    setSegment(urlSegment);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 900;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="app">
      <div className="page">
        <Navigation setSegment={setSegment} segment={segment} />
        {renderContent()}
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
