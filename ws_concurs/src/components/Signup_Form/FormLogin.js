import React, { useRef } from "react";
import { validateLoginInfo } from "./validateInfo";
import { LoginForm } from "./useForm";
import "./Form.css";

const FormLogin = ({ toLogin }) => {
  const { handleChange, handleSubmit, values, errors } = LoginForm(
    toLogin,
    validateLoginInfo
  );
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div className="container-sign-login" style={{ height: "100vh" }}>
      <form
        onSubmit={handleSubmit}
        className="form-container"
        noValidate
        style={{ gridTemplateColumns: "1fr"}}
      >
        <div className="form form-content-right">
          <h1>Login aici</h1>
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
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
