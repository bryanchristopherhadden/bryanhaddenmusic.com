import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

const config = {

};

const App = () => {
  const [landingPageData, setLandingPageData] = useState(config);
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default App;
