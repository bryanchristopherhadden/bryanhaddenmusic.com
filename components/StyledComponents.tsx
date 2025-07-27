'use client'

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Button } from "@mui/material";
import { motion } from "motion/react";

// Enhanced CSS animations for other components
export const dropdownAnimation = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

export const glowingBorder = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
`;

// Basketball bounce animation variants
export const bounceVariants = {
  initial: {
    y: -800,
    scale: 0.3,
    rotate: -15,
    opacity: 0,
  },
  animate: {
    y: 0,
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 50,
      damping: 8,
      mass: 1.5,
      bounce: 0.8
    }
  },
  hover: {
    scale: 1.1,
    rotate: 3,
    y: -10,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    }
  },
  tap: {
    scale: 0.9,
    y: 5,
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 20,
    }
  }
};

// Enhanced Basketball Button with Framer Motion
export const BasketballButton = styled(motion.button)`
  background-color: transparent;
  color: white;
  cursor: pointer;
  border: 1px solid transparent;
  width: -webkit-fill-available;
  display: block;
  padding: 0;
  font-size: 24px;
  white-space: break-spaces;
  line-height: 44px;
  font-weight: 800;
  position: relative;
  overflow: hidden;

  > span {
    padding-left: 0.25rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  @media (min-width: 900px) {
    margin-top: 100px;
    width: max-content;
    padding: 12px 20px;
  }

  @media (max-width: 900px) {
    text-align: left;
    white-space: break-spaces;
  }
`;

export const DropdownDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  color: black;
  z-index: 100;
  transform: translateY(-100%);
  animation: ${dropdownAnimation} 0.5s ease-out forwards;
  padding: 20px;
  color: #608dfd;
`;

export const PlayButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  min-width: 60px;
  margin-top: 20px;
  animation: ${glowingBorder} 3s infinite;

  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

