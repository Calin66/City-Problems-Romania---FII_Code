import React, { useEffect, useState } from "react";
import "./DetaliiCont.css";
import { AiFillStar } from "react-icons/ai";
import Navbar from "../../NavBar/navBar.js";
import { db, upload } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { DetaliiContSwipe } from "./DetaliiContSwipe";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import LinkAdministrator from "./LinkAdministrator";

const DetaliiCont = () => {
  const [userCData, setUserCData] = useState();
  const [toggle, setToggle] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [userA, setUserA] = useState();
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserA(user);
    }
  });
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const getUsers = async () => {
    if (userA) {
      // console.log(userA);
      const uid = userA.uid;
      const userCollectionRef = doc(db, "users", uid);
      const docSnap = await getDoc(userCollectionRef);
      if (docSnap.exists()) {
        setUserCData(docSnap.data());
        // console.log(docSnap.data());
      } else {
        console.log("No");
      }
      if (userA.photoURL) {
        setPhotoURL(userA.photoURL);
      }
    }
  };
  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }
  function handleClick() {
    upload(photo, userA, setLoading);
  }
  useEffect(() => {
    getUsers();
  }, [userA]);
  return (
    <>
      {!toggle ? (
        <div className="container-detalii">
          <Navbar backgroundColor="black" />
          <div className="detalii-cont">
            <FaBars className="bars" onClick={handleToggle} />
            <div className="cont-optiuni">
              <ul
                style={{ textDecoration: "none", listStyle: "none" }}
                className="optiuni"
              >
                <Link className="link" to="/">
                  <li>Acasa</li>
                </Link>
                <Link className="link" to="/detaliicont">
                  <li>Informatii utilizator</li>
                </Link>
                <Link className="link" to="/creeazapostare">
                  <li>Creeaza postare</li>
                </Link>
                <Link className="link" to="/postarilemele">
                  <li>Postarile mele</li>
                </Link>
                <Link className="link" to="/favorite">
                  <li>Favorite</li>
                </Link>
                <Link className="link" to="/securitate">
                  <li>Securitate</li>
                </Link>
                {userCData && (
                  <LinkAdministrator
                    number={userCData.status}
                  />
                )}
              </ul>
            </div>
            <div id="opt-cont">
              <div className="optiune-cont">
                <h1>Nume</h1>
                <p>{userCData && userCData.name}</p>
                <h1>Judet</h1>
                <p>{userCData && userCData.localitate}</p>
                <h1>Localitate</h1>
                <p>{userCData && userCData.judet}</p>
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
            <div className="informatiiUtilizator2">
              <div className="optiune-cont">
                <h1>Email</h1>
                <p>{userA && userA.email}</p>
                <h1>Username</h1>
                <p>{userA && userA.displayName}</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <h1>User profile picture</h1>
                  <img src={photoURL} alt="" className="avatar" />
                </div>

                <div className="fields">
                  <input
                    type="file"
                    onChange={handleChange}
                    className="inputAvatar"
                  />
                  <button
                    disabled={loading || !photo}
                    onClick={handleClick}
                    className="uploadAvatar"
                  >
                    Upload
                  </button>
                </div>
                <div style={{ marginTop: "30px" }}>
                  <h1>Dovada adresa</h1>
                  <img
                    src={userCData && userCData.dovada}
                    className="dovadaImg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <DetaliiContSwipe handleToggle={handleToggle} />
        </div>
      )}
    </>
  );
};

export default DetaliiCont;
