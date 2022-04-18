import React, { useRef } from "react";
import validate from "./validateInfo";
import { LoginForm } from "./useForm";
import "./Form.css";

const FormLogin = ({ toLogin, submitForm }) => {
  const { handleChange, handleSubmit, values, errors} = LoginForm(
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
          Login aici
        </h1>
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
        <button className="form-input-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
