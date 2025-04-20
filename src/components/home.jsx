import React, { useState, useEffect } from "react";
import { Drawer, Button, List, ListItem, ListItemText } from "@mui/material";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

// Create a basketball bounce animation
const bounceAnimation = keyframes`
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

// Create a styled button with the animation
const BasketballButton = styled(Button)`
  animation: ${bounceAnimation} 2.5s forwards;
  background-color: transparent;
  color: white;
  padding: 16px;
  margin-left: 0;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: rgb(99, 114, 255);
    margin-left: 16px;
    margin-top: -8px;
    margin-bottom: 8px;
    border: 1px solid white;
    scale: 1.05;
    font-size: 1.65rem;
  }
`;

const TemporaryDrawer = () => {
  const [open, setOpen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Set animation as complete after the animation duration
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(isOpen);
  };

  const menuItems = [
    { text: "Home", path: "header" },
    { text: "Contact", path: "contact" },
  ];

  return (
    <div>
      <BasketballButton
        id="basketballButton"
        onClick={toggleDrawer(true)}
        variant="contained"
      >
        {">> Make Better Music Button"}
      </BasketballButton>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          style={{ width: 250 }}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem key={index} component="a" href={item.path}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default (props) => {
  return (
    <div className="column">
      <h1 style={{ margin: 0 }}>Lets make your music more like you.</h1>
      <p>
        The ups and downs are here to stay like your creativity. <br />
        Let's use it all.
      </p>
      <TemporaryDrawer />
    </div>
  );
};
