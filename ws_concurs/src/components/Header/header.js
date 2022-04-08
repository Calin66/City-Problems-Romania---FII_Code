import React from "react";
import header1 from "./../images/header1.mp4";
import "./header.css";

const postings = [{
  
}, {

}];




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
      <div id="postari_filtrare">
        <h2>Postari</h2>
        <h2>Filtrare</h2>
        <Postari />
        <Filtrare />
      </div>
    </div>
  );
};
const Postari = () => {
  return (
      <div id="postari">
        <div>gg</div>
        <div>gg</div>
        <div>gg</div>
        <div>gg</div>
        <div>gg</div>
      </div>
  );
};
const Postare = () => {
  return (
    <div>
      <img />
      <h3></h3>
      <p></p>
    </div>
  );
};
const Filtrare = () => {
  return <div id="filtrare"></div>;
};

export default Header;
