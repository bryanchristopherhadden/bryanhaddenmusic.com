import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Button } from "@mui/material";

// Animations
export const bounceAnimation = keyframes`
  0% {
    transform: translateY(-100vh);
    animation-timing-function: ease-in;
  }
  40% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  55% {
    transform: translateY(-12vh);
    animation-timing-function: ease-in;
  }
  70% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  82% {
    transform: translateY(-7vh);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(-.75vh);
    animation-timing-function: ease-out;
  }
`;

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

// Styled Components
export const BasketballButton = styled(Button)`
  animation: ${bounceAnimation} 2.5s forwards;
  background-color: transparent;
  color: white;
  padding: 16px;
  margin: 80px 0 24px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.3s ease-in-out;
  border: 1px solid transparent;

  > span {
    padding-left: 1.5rem;
  }

  &:hover {
    color: #6372ff;
    border: 1px solid white;
    scale: 1.05;
    font-size: 1.65rem;
  }

  @media (max-width: 900px) {
    text-align: left;
    white-space: nowrap;
    margin: 80px 0 24px;
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
