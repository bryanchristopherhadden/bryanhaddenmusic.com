"use client";

import { MusicPlayer } from "../src/components/MusicPlayer.jsx";
import { useState, useEffect, useRef } from "react";
import {
  DropdownDiv,
  BasketballButton,
} from "../components/StyledComponents.js";

const EmailButton = () => {
  const [_, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const openEmailApp = () => {
    window.location.href =
      "mailto:bryanchrishadden@gmail.com?subject=Music%20Inquiry&body=I'd%20like%20to%20learn%20more%20about%20making%20better%20music.";
  };

  return (
    <BasketballButton
      id="basketballButton"
      onClick={openEmailApp}
      variant="contained"
    >
      {">>"}
      <span>Make Better Music Button</span>
    </BasketballButton>
  );
};

const DropdownContent = ({ modalIsVisable, onClose }) =>
  modalIsVisable ? (
    <DropdownDiv className="container">
      <MusicPlayer visible={modalIsVisable} onClose={onClose} />
    </DropdownDiv>
  ) : null;

export default function Home() {
  const columnRef = useRef(null);
  const [modalIsVisable, setModalIsVisable] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 990);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleModal = () => {
    setModalIsVisable(!modalIsVisable);
  };

  return (
    <main>
      <div className="column" ref={columnRef}>
        <DropdownContent
          modalIsVisable={modalIsVisable}
          onClose={() => setModalIsVisable(false)}
        />
        {!modalIsVisable && (
          <div className="play-button-container">
            <button
              onClick={toggleModal}
              aria-label="Toggle music player"
              className="btn btn-custom"
            >
              {/* {modalIsVisable ? "✕" : <span>{"▶"}</span>} */}
              {<span>{"▶"}</span>}
            </button>
          </div>
        )}
        <h1>Lets make your music sound more like you.</h1>
        <p>
          The ups and downs are here to stay, just like your creativity. <br />
          Let&apos;s use it all.
        </p>
        <EmailButton />
      </div>
    </main>
  );
}
