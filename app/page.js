"use client";

import { useState, useEffect, useRef } from "react";
import {
  BasketballButton,
  DropdownDiv,
} from "@/components/StyledComponents.jsx";
import MusicPlayer from "@/components/MusicPlayer.jsx";

const EmailButton = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  // Animation effect
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
    <DropdownDiv
      className="container"
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "5rem",
      }}
    >
      <MusicPlayer visible={modalIsVisable} />
    </DropdownDiv>
  ) : null;

export default function Home() {
  const columnRef = useRef(null);
  const [modalIsVisable, setModalIsVisable] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Set initial mobile state after component mounts
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 990);
    };
    
    // Set initial value
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleModal = () => {
    setModalIsVisable(!modalIsVisable);
  };

  return (
    <main>
      <div className="column" ref={columnRef} style={{ position: "relative" }}>
        <DropdownContent
          modalIsVisable={modalIsVisable}
          onClose={() => setModalIsVisable(false)}
        />
        <div
          className="play-button-container"
          style={{
            position: isMobile ? "fixed" : "static",
            bottom: isMobile ? "20px" : "auto",
            right: isMobile ? "20px" : "auto",
            zIndex: isMobile ? "1000" : "auto",
          }}
        >
          <button
            onClick={toggleModal}
            aria-label="Toggle music player"
            className="btn btn-custom"
            style={{
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {modalIsVisable ? "✕" : "▶"}
          </button>
        </div>
        <h1 style={{ margin: 0 }}>Lets make your music more like you.</h1>
        <p>
          The ups and downs are here to stay, just like your creativity. <br />
          Let&apos;s use it all.
        </p>
        <EmailButton />
      </div>
    </main>
  );
}
