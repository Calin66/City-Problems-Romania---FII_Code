import React, { useRef } from "react";
import validate from "./validateInfo";
import useForm from "./useForm";
import "./Form.css";

const FormSignup = ({ toLogin, submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    toLogin,
    submitForm,
    validate
  );
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div className="form-content-right">
      <form onSubmit={handleSubmit} className="form" noValidate>
        <h1>
          Vrei sa faci Romania un loc mai bun? <br /> Completeaza formularul de
          mai jos pentru a incepe!
        </h1>
        <div className="form-inputs">
          <label className="form-label">Nume utilizator</label>
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
        <button className="form-input-btn" type="submit">
          Sign up
        </button>
        <span className="form-input-login">
          Ai deja un cont? Login <a href="#">aici</a>
        </span>
      </form>
    </div>
  );
};

export default FormSignup;
