import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Contact } from "./components/contact";
import Home from "./components/home";

const App = () => {
  const [segment, setSegment] = useState("");

  const renderContent = () => {
    const contentMap = {
      home: <Home />,
      contact: <Contact />,
    };

    return contentMap[segment] || contentMap.home;
  };

  useEffect(() => {
    const path = window.location.pathname;
    const urlSegment = path.split("/").filter(Boolean)[0] || "";
    setSegment(urlSegment);
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
