import { useState, useEffect } from "react";
import { db, login, signup } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
const useForm = (log, callback, validate) => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    judet: "",
    localitate: "",
    dovada: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const forsign = async () => {
        await signup(values.email, values.password).catch(function (error) {
          let errorCode = error.code;
          if (errorCode == "auth/email-already-in-use") {
            log();
            alert("Email deja inregistrat");
          }
        });
        log();
      };
      forsign();
    }
  }, [errors]);

  return { handleChange, values, handleSubmit, errors, handleLogin };
};

export default useForm;
export const LoginForm = (callback, validate) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      login(values.email, values.password).catch(function (error) {
        let errorCode = error.code;
        if (errorCode) alert(errorCode);
      });
      callback();
    }
  }, [errors]);

  return { handleChange, values, handleSubmit, errors };
};
