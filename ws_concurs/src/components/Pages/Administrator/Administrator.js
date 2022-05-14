import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db, useAuth } from "../../../firebase";
import Navbar from "../../NavBar/navBar";
import "./administrator.css";
const Administrator = () => {
  const [postsCollectionRef, setPostsCollectionRef] = useState(
    collection(db, "posts")
  );
  const [userCData, setUserCData] = useState();
  const [userId, setUserId] = useState();
  const user = useAuth();

  const getUserData = async () => {
    if (user) {
      console.log("User data");
      const uid = user.uid;
      const userCollectionRef = doc(db, "users", uid);
      const docSnap = await getDoc(userCollectionRef);
      if (docSnap.exists()) {
        setUserCData(docSnap.data());
        // console.log(docSnap.data());
      } else {
        console.log("Error docSnap");
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, [user]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const userCollectionRef = doc(db, "users", userId);
      await updateDoc(userCollectionRef, { status: 1 });
    } catch (e) {
      alert(e);
    }
    // alert(userId);
  };
  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  return (
    <div>
      <Navbar backgroundColor="black" />
      <div
        style={{
          position: "relative",
          top: "150px",
          left: "5%",
          width: "90%",
        }}
      >
        <h2 style={{ fontWeight: "400" }}>
          Atribuire moderatori{" "}
          {/* <span style={{ fontWeight: "500" }}>
            {userCData && userCData.localitate}
          </span> */}
        </h2>
        <div className="at-md-container">
          <h4 style={{ color: "red" }}>
            Moderatorul trebuie sa aiba cont deja creat pe platforma
          </h4>
          <form onSubmit={handleSubmit} noValidate>
            <input
              placeholder="Introdu User ID"
              onChange={handleChange}
              value={userId}
              className="at-md-input"
            />
            <button type="submit" className="at-md-submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Administrator;
