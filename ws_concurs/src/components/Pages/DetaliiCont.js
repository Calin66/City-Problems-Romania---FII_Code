import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./DetaliiCont.css";
import { BsGithub } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import Navbar from "../NavBar/navBar.js";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const DetaliiCont = () => {
  const [pagina, setPagina] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
  return (
    <div className="container-detalii">
      <Navbar backgroundColor="black" />
      <div className="detalii-cont">
        <div className="cont-optiuni">
          <ul
            style={{ textDecoration: "none", listStyle: "none" }}
            className="optiuni"
          >
            <li onClick={() => setPagina(0)}>Informatii utilizator</li>
            <li onClick={() => setPagina(1)}>Creeaza postare</li>
            <li onClick={() => setPagina(2)}>Postarile mele</li>
            <li onClick={() => setPagina(3)}>Favorite</li>
            <li onClick={() => setPagina(4)}>Securitate</li>
          </ul>
        </div>
        {!pagina ? (
          <div id="opt-cont">
            <div className="optiune-cont">
              <h1>Nume</h1>
              {users.map((user) => {
                return <p>{user.name}</p>;
              })}
              <h1>Judet</h1>
              <p>Iasi</p>
              <h1>Localitate</h1>
              <p>Rediu</p>
              <h1 style={{ marginTop: "20px", marginBottom: "10px" }}>
                My Rating
              </h1>
              <div
                style={{ color: "orange", display: "flex", fontSize: "25px" }}
              >
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      ;
    </div>
  );
};

export default DetaliiCont;
