"use client";

import MusicPlayer from "../components/MusicPlayer";
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

export default function MusicPage(): JSX.Element {
  const columnRef = useRef<HTMLDivElement>(null);
  const [modalIsVisable, setModalIsVisable] = useState<boolean>(true);
  const [_, setIsMobile] = useState<boolean>(false);
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
        <DropdownDiv className="container">
          <MusicPlayer
            visible={true}
            onClose={toggleModal}
            onPlayingChange={setIsPlaying}
          />
        </DropdownDiv>
        <br />
        <h1>Warm grooves. Small drops. Big feeling..</h1>
        <p style={{  }}>Soulful instrumental music and limited-run collectibles — handcrafted for late nights, long drives, and the people who keep coming back.</p>
        <button className="btn btn-custom" style={{ margin: "0 16px 0 0", opacity: ".5" }} disabled>Listen / Pre-save</button>
        <button className="btn btn-custom" style={{ opacity: ".5" }} disabled>Shop Limited Drops</button>
      </div>

      {/* Music animation bar at bottom */}
      <motion.div
        className="music-animation-bar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "4px",
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
