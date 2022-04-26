import React, { useEffect, useState } from "react";
import FormSignup from "./FormSignup";
import FormLogin from "./FormLogin";
import "./Form.css";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { db, useAuth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const Form = () => {
  const [login, setLogin] = useState(false);
  const [submit, setSubmit] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const submitForm = () => {
    setSubmit(true);
    if (!login) {
      // aici ar trebui sa vina datele aditionale despre utilizator. foloseste uid
      const addInfo = async () => {
        const infoRef = doc(db, "users", user.uid);
        try {
          await setDoc(infoRef, { name: "Calin" });
        } catch (error) {
          alert(error);
        }
      };
      addInfo();

      navigate("/");
      alert("Contul dumneavoastra a fost creat");

      setLogin(true);
    }
  };
  const toLogin = () => {
    if (!login) submitForm();
    else setLogin(true);
  };

  let navigate = useNavigate();

  return (
    <div style={{ position: "relative" }}>
      <Link
        to="/"
        style={{
          backgroundColor: "white",
          width: "fit-content",
          height: "fit-content",
          position: "absolute",
          right: "19%",
          top: "100px",
        }}
      >
        <span className="close-btn">
          <IoClose style={{ fontSize: "35px" }} />
        </span>
      </Link>
      {!login ? (
        <FormSignup toLogin={toLogin} submitForm={submitForm} />
      ) : (
        <FormLogin toLogin={toLogin} submitForm={submitForm} />
      )}
    </div>
  );
};

export default Form;
