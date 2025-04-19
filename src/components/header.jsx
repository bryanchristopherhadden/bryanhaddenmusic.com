import React, { useState } from "react";
import { Drawer, Button, List, ListItem, ListItemText } from "@mui/material";

const TemporaryDrawer = () => {
  const [open, setOpen] = useState(false);

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
      <Button onClick={toggleDrawer(true)}>
        {">> I Deserve A Grammy Button"}
      </Button>
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

export default TemporaryDrawer;

export const Header = (props) => {
  const headerStyle = {
    height: "100vh",
    backgroundImage: `url(${props.data ? props.data.image : ""})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textAlign: "center",
  };

  return (
    <header id="header" style={headerStyle}>
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <h1>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                {/* Uncomment if you want to use the drawer */}
                <TemporaryDrawer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
