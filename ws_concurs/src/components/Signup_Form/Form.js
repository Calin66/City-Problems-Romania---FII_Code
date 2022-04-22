import React, { useState } from "react";
import FormSignup from "./FormSignup";
import FormLogin from "./FormLogin";
import "./Form.css";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase";
const Form = () => {
  const [login, setLogin] = useState(false);
  const [submit, setSubmit] = useState(false);
  const currentUser = useAuth();
  const submitForm = () => {
    setSubmit(true);
    if (!login) {
      alert("Contul dumneavoastra a fost creat");
      navigate("/");
    }
  };
  const toLogin = () => {
    if (login) submitForm();
    else setLogin(true);
  };

  let navigate = useNavigate();
  if (currentUser) navigate("/");
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
