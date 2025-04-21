import { useState, useEffect, useRef } from "react";
import { BasketballButton, DropdownDiv } from "../styles/StyledComponents";
import MusicPlayer from "./MusicPlayer";

const EmailButton = () => {
  const [, setAnimationComplete] = useState(false);

  // animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const openEmailApp = () => {
    // Using mailto protocol to open default email client
    window.location.href =
      "mailto:bryanchrishadden@gmail.com?subject=Music%20Inquiry&body=I'd%20like%20to%20learn%20more%20about%20making%20better%20music.";
  };

  return (
    <div>
      <BasketballButton
        id="basketballButton"
        onClick={openEmailApp}
        variant="contained"
      >
        {">>"}
        <span>Make Better Music Button</span>
      </BasketballButton>
    </div>
  );
};

const DropdownContent = ({ modalIsVisable }) =>
  modalIsVisable ? (
    <DropdownDiv className="container" style={{ 
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <MusicPlayer visible={modalIsVisable} />
    </DropdownDiv>
  ) : null;

function Home(props) {
  const columnRef = useRef(null);

  return (
    <div className="column" ref={columnRef} style={{ position: "relative" }}>
      <DropdownContent {...props} onClose={props.onClose} />
      <h1 style={{ margin: 0 }}>Lets make your music more like you.</h1>
      <p>
        The ups and downs are here to stay, just like your creativity. <br />
        Let's use it all.
      </p>
      <EmailButton />
    </div>
  );
}

export default Home;
