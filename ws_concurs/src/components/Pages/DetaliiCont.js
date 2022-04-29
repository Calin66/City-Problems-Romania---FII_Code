import React, { useEffect, useState } from "react";
import "./DetaliiCont.css";
import { AiFillStar } from "react-icons/ai";
import Navbar from "../NavBar/navBar.js";
import { db, upload } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const DetaliiCont = () => {
  const [userCData, setUserCData] = useState();
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
    <div className="container-detalii">
      <Navbar backgroundColor="black" />
      <div className="detalii-cont">
        <div className="cont-optiuni">
          <ul
            style={{ textDecoration: "none", listStyle: "none" }}
            className="optiuni"
          >
            <li>Informatii utilizator</li>
            <li>Creeaza postare</li>
            <li>Postarile mele</li>
            <li>Favorite</li>
            <li>Securitate</li>
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
            <div style={{ color: "orange", display: "flex", fontSize: "25px" }}>
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
            <h1>User profile picture</h1>
            <div className="fields">
              <input type="file" onChange={handleChange} />
              <button disabled={loading || !photo} onClick={handleClick}>
                Upload
              </button>
              <img src={photoURL} alt="" className="avatar" />
            </div>
            {/* <p
              style={{
                position: "relative",
                bottom: "10px",
                fontSize: "16px",
                left: "130px",
              }}
            >
              Refresh pagina pentru schimbari
            </p> */}
            <h1>Dovada adresa</h1>
            <img src={userCData && userCData.dovada} className="dovadaImg" />
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default DetaliiCont;
