import { useState, useEffect } from "react";
import { signup } from "../../firebase";
import { useNavigate } from "react-router-dom";
const useForm = (log, callback, validate) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ok, setok] = useState(false);
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

      signup(values.email, values.password).catch(function (error) {
        let errorCode = error.code;
        if (errorCode == "auth/email-already-in-use") {
          log();
          alert("Email deja inregistrat");
        }
      });
      log();
    }
  }, [errors]);

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
