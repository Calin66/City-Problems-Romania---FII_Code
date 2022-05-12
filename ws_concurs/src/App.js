import React, { useEffect, useState } from "react";
import Form from "./components/Signup_Form/Form";
import Navbar from "./components/NavBar/navBar";
import Header from "./components/Header/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErorrPage from "./components/ErorrPage";
import DetaliiCont from "./components/Pages/DetaliiCont/DetaliiCont";
import FormLogin from "./components/Signup_Form/FormLogin";
import Postare from "./components/Pages/Postare/Postare";
import ProtectedRoutes, { ProtectedRoutes2 } from "./ProtectedRoutes";
import Administrator from "./components/Pages/Administrator/Administrator";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import Postari from "./components/Pages/Postari/Postari";
import VeziPostare from "./components/Pages/Postari/VeziPostare/VeziPostare";
import Favorite from "./components/Pages/Favorite/Favorite";
function App() {
  const [userCData, setUserCData] = useState();
  const [userA, setUserA] = useState();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserA(user);
    }
  });
  const getUsers = async () => {
    if (userA) {
      const uid = userA.uid;
      const userCollectionRef = doc(db, "users", uid);
      const docSnap = await getDoc(userCollectionRef);
      if (docSnap.exists()) {
        setUserCData(docSnap.data());
      } else {
        console.log("No");
      }
    }
  };
  useEffect(() => {
    getUsers();
  }, [userA]);
  
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Form />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/postari" element={<Postari/>} />
        <Route path="/vezipostare" element={<VeziPostare/>} />
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/"
            element={
              <div>
                <Navbar />
                <Header />
              </div>
            }
          />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/creeazapostare" element={<Postare />} />
          <Route path="/detaliicont" element={<DetaliiCont />} />
          <Route path="*" element={<ErorrPage />} />
          <Route path="/administrator1" element={<ProtectedRoutes2 />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
