"use client";

import { MusicPlayer } from "../components/MusicPlayer";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  DropdownDiv,
  BasketballButton as MakeBetterMusicButton,
  bounceVariants,
} from "../components/StyledComponents";

interface DropdownContentProps {
  modalIsVisable: boolean;
  onClose: () => void;
}

const EmailButton = (): JSX.Element => {
  const [_, setAnimationComplete] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const openEmailApp = (): void => {
    window.location.href =
      "mailto:bryanchrishadden@gmail.com?subject=Music%20Inquiry&body=I'd%20like%20to%20learn%20more%20about%20making%20better%20music.";
  };

  return (
    <MakeBetterMusicButton
      id="basketballButton"
      onClick={openEmailApp}
      variants={bounceVariants}
      initial={false}
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      transition={{
        delay: 0.5,
      }}
      style={{
        color: "#6372ff",
        border: "1px solid white",
        fontSize: "24px",
      }}
    >
      {">>"}
      <span>Make Better Music Button</span>
    </MakeBetterMusicButton>
  );
};

const DropdownContent = ({ modalIsVisable, onClose, onPlayingChange }: DropdownContentProps & { onPlayingChange: (playing: boolean) => void }): JSX.Element | null =>
  modalIsVisable ? (
    <DropdownDiv className="container">
      <MusicPlayer visible={modalIsVisable} onClose={onClose} onPlayingChange={onPlayingChange} />
    </DropdownDiv>
  ) : null;

export default function Home(): JSX.Element {
  const columnRef = useRef<HTMLDivElement>(null);
  const [modalIsVisable, setModalIsVisable] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobile(window.innerWidth <= 990);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleModal = (): void => {
    const newModalState = !modalIsVisable;
    setModalIsVisable(newModalState);
    setIsPlaying(newModalState);
  };

  return (
    <main>
      <div className="column" ref={columnRef}>
        <DropdownContent
          modalIsVisable={modalIsVisable}
          onClose={() => {
            setModalIsVisable(false);
            setIsPlaying(false);
          }}
          onPlayingChange={setIsPlaying}
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
        <br />
        <h1>Lets make your music sound more like you.</h1>
        <p>
          The ups and downs are here to stay, just like your creativity.
        </p>
        <p>
          Let&apos;s use it all.
        </p>
        <div style={{ marginTop: "20px" }}>
          <EmailButton />
        </div>
      </div>
      
      {/* White animation bar at bottom */}
      <motion.div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "4px",
          backgroundColor: "white",
          zIndex: 1000,
        }}
        initial={{ x: "-100%" }}
        animate={isPlaying ? { x: "100%" } : { x: "-100%" }}
        transition={{
          duration: 3,
          repeat: isPlaying ? Infinity : 0,
          ease: "linear"
        }}
      />
    </main>
  );
} 