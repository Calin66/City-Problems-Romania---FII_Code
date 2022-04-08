import React from "react";
import header1 from "./../images/header1.mp4";
import "./header.css";
const Header = () => {
  return (
    <div>
      <video src={header1} loop muted autoPlay />
      <div id="transp"></div>
      <div id="infoplus">
        <h1>City Problems Romania</h1>
        <h2>Intrebari, propuneri si probleme</h2>
        <p>Fa tot ce poti pentru o Romanie mai buna!</p>
        <button id="button">Posteaza si tu!</button>
        <div id="infoplusop"></div>
      </div>
    </div>
  );
};

export default Header;
