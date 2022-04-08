import React from "react";
import "./navBar.css";
import sgl from "./../images/sigla.png";

const Navbar = () => {
  return (
    <div id="navbar">
      <div id="navigatie">
        <div id="logo_sigla">
          <img src={sgl} />
          <h1>City Problems Romania</h1>
        </div>
        <button id="sign">Sign up!</button>
      </div>
      <div id="bara"></div>
    </div>
  );
};

export default Navbar;