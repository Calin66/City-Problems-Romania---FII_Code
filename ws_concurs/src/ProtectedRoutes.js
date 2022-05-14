import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/header";
import Navbar from "./components/NavBar/navBar";
import Administrator from "./components/Pages/Administrator/Administrator";
import DetaliiCont from "./components/Pages/DetaliiCont/DetaliiCont";
import { db, useAuth } from "./firebase";

const ProtectedRoutes = () => {
  const currentUser = useAuth();
  return currentUser ? (
    <Outlet />
  ) : (
    <>
      <Navbar /> <Header />
    </>
  );
};

export default ProtectedRoutes;

export const ProtectedRoutes2 = () => {
  const [userCData, setUserCData] = useState();
  const [userA, setUserA] = useState();
  const [loading, setLoading] = useState(false);
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
    }
  };
  useEffect(() => {
    getUsers();
  }, [userA]);
  if (userCData?.status === 1) return <Administrator />;
  else return <DetaliiCont />;
};
