import Home from "./components/home";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Contact } from "./components/contact";
import { PlayButton } from "./styles/StyledComponents";

function Footer() {
  return (
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
  );
}

function PlayButtonContainer({ modalIsVisable, toggleModal }) {
  if (window.location.pathname === "/contact") {
    return null;
  }
  
  return (
    <div className="play-button-container">
      <PlayButton
        variant="contained"
        onClick={toggleModal}
        aria-label="Toggle menu"
        className="play-button"
      >
        {modalIsVisable ? <CloseIcon /> : <PlayArrowIcon />}
      </PlayButton>
    </div>
  );
}

function ContentRenderer(props) {
  const contentMap = {
    home: <Home {...props} />,
    contact: <Contact {...props} />,
  };
  return contentMap[props.segment] || contentMap.home;
}

function renderContent(props) {
  return <ContentRenderer {...props} />;
}

const App = () => {
  const [segment, setSegment] = useState("");
  const [modalIsVisable, setModalIsVisable] = useState(false);

  function toggleModal() {
    setModalIsVisable(!modalIsVisable);
  }

  useEffect(() => {
    const path = window.location.pathname;
    const urlSegment = path.split("/").filter(Boolean)[0] || "";
    setSegment(urlSegment);
  }, []);

  return (
    <div id="app">
      <div className="page">
        <Navigation setSegment={setSegment} segment={segment} />
        <PlayButtonContainer
          modalIsVisable={modalIsVisable}
          toggleModal={toggleModal}
        />
        {renderContent({ segment, modalIsVisable, toggleModal })}
      </div>
      <Footer />
    </div>
  );
};

export default App;
