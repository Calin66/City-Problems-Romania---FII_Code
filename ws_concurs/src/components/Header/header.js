import React from 'react';
import imgheader from "./../images/poza_header.jpg";
import "./header.css";
const Header = () => {
  return (
    <div>
        <img src={imgheader} id="imgh"/>
        <div id="transp"></div>
        <div id="infoplus">
          <h1>Intrebari, propuneri si probleme</h1>
          <p>Fa tot ce poti pentru o Romanie mai buna!</p>
          <button id="button">Posteaza si tu!</button>
          <div id="infoplusop"></div>
        </div>
        <div id="postari_filtrare">
          <div>
            Postari
          </div>
          <div>
            Filtrare
          </div>
          <div style={{backgroundColor:"red"}}>

          </div>
          <div style={{backgroundColor:"orange"}}>

          </div>
        </div>
    </div>
  )
}

export default Header;