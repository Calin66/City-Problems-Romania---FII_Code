import React from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./DetaliiContSwipe.css";

export const DetaliiContSwipe = ({ handleToggle }) => {
  return (
    <div className="container-swipeDetalii">
      <FaBars className="bars" color="white" onClick={handleToggle} />
      <Link className="link" to="/">
        Acasa
      </Link>
      <Link className="link" to="/detaliicont">
        Informatii utilizator
      </Link>
      <Link className="link" to="/creeazapostare">
        Creeaza postare
      </Link>
      <Link className="link" to="/postarilemele">
        Postarile mele
      </Link>
      <Link className="link" to="/favorite">
        Favorite
      </Link>
      <Link className="link" to="/securitate">
        Securitate
      </Link>
    </div>
  );
};
