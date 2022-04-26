import React, { useRef } from "react";
import validate from "./validateInfo";
import useForm from "./useForm";
import "./Form.css";
import { useNavigate } from "react-router-dom";

const FormSignup = ({ toLogin, submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    toLogin,
    submitForm,
    validate
  );
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  return (
    <div className="container-sign-login">
      <form onSubmit={handleSubmit} className="form-container" noValidate>
        <div className="form-content-right form">
          <h1>
            Vrei sa faci Romania un loc mai bun? <br /> Completeaza formularul
            de mai jos pentru a incepe!
          </h1>
          <div className="form-inputs">
            <label className="form-label">Nume complet</label>
            <input
              className="form-input"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div className="form-inputs">
            <label className="form-label">Username</label>
            <input
              className="form-input"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div className="form-inputs">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className="form-inputs">
            <label className="form-label">Parola</label>
            <input
              className="form-input"
              type="password"
              name="password"
              ref={passwordRef}
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div className="form-inputs">
            <label className="form-label">Confirmare parola</label>
            <input
              className="form-input"
              type="password"
              name="password2"
              placeholder="Confirm your password"
              value={values.password2}
              onChange={handleChange}
            />
            {errors.password2 && <p>{errors.password2}</p>}
          </div>
        </div>
        <div className="form-content-left form2">
          <div className="form-inputs">
            <label className="form-label">Judet</label>
            <input
              className="form-input"
              type="text"
              name="judet"
              placeholder="Ex: Iasi"
              value={values.judet}
              onChange={handleChange}
            />
            {errors.judet && <p>{errors.judet}</p>}
          </div>
          <div className="form-inputs">
            <label className="form-label">Localitate</label>
            <input
              className="form-input"
              type="text"
              name="localitate"
              placeholder="Ex: Rediu"
              value={values.localitate}
              onChange={handleChange}
            />
            {errors.localitate && <p>{errors.localitate}</p>}
          </div>
          <div className="form-inputs">
            <label className="form-label">Dovada adresa</label>
            <input
              className="form-input"
              type="file"
              name="dovada"
              value={values.dovada}
              onChange={handleChange}
            />
            {errors.dovada && <p>{errors.dovada}</p>}
          </div>

          <button className="form-input-btn" type="submit">
            Sign up
          </button>
          <span className="form-input-login">
            Ai deja un cont? Login
            <a
              href="#"
              onClick={() => {
                navigate("/login");
              }}
            >
              aici
            </a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default FormSignup;
