import React, { useState } from "react";
import "./navBar.css";
import sgl from "./../images/sigla.png";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuth } from "../../firebase";
import { BiExit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {logout } from "../../firebase";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  
  let navigate = useNavigate();
  const handleNewPost = () => {
    navigate("/creeazapostare");
  };
  const currentUser = useAuth();
  const [openSide, setOpenSide] = useState(false);
  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  return (
    <div id="navigatie">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div id="logo_sigla">
          <img src={sgl} />
          <h1>City Problems Romania</h1>
        </div>
      </Link>
      {!currentUser ? (
        <Link to="/signup">
          <button id="sign">Sign up!</button>
        </Link>
      ) : (
        <div id="user-container">
          <div className="user-name-icon" onClick={() => setOpenSide(true)}>
            <p className="user-name">Username</p>
            <FaRegUserCircle className="user-icon" />
          </div>
          <div id="user-options">
            <p onClick={handleNewPost}>Creeaza postare</p>
            <p>Postarile mele</p>
            <p>Detalii cont</p>
            <p>Favorite</p>
            <p id="logout" onClick={handleLogout}>
              Log out
              <BiExit
                style={{ fontSize: "24px", position: "relative", left: "5px" }}
              />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
