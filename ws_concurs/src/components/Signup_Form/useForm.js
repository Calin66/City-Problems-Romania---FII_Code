import { useState, useEffect } from "react";
import { db, login, signup } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { storage } from "../../firebase";
import { ref } from "firebase/storage";
import { async } from "@firebase/util";
const useForm = (validate) => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    judet: "",
    localitate: "",
    dovada: null,
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isErorare, setIsEroare] = useState(false);
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
  const log = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    // aici ar trebui sa vina datele aditionale despre utilizator. foloseste uid
    if (user.uid) {
      const addInfo = async () => {
        const infoRef = doc(db, "users", user.uid);
        try {
          await setDoc(infoRef, {
            name: values.name,
            judet: values.judet,
            localitate: values.localitate,
          });
        } catch (error) {
          alert(error);
        }
      };
      await addInfo();

      navigate("/");
      alert("Contul dumneavoastra a fost creat");
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const forsign = async () => {
        await signup(values.email, values.password).catch(function (error) {
          let errorCode = error.code;
          if (errorCode == "auth/email-already-in-use") {
            alert("Email deja inregistrat");
            setIsEroare(true);
          }
        });
        // const imageRef=ref(storage, `images/${values.dovada.name}`);
        if (isErorare) {
          navigate("/login");
        } else {
          log();
        }
      };
      forsign();
    }
  }, [errors]);

  return { handleChange, values, handleSubmit, errors, handleLogin };
};

export default useForm;
export const LoginForm = (callback, validate) => {
  const [loginSuccess, setLoginSuccess] = useState(true);
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
  const handleLogin = async () => {
    await login(values.email, values.password).catch(function (error) {
      let errorCode = error.code;
      if (errorCode) {
        setLoginSuccess(false);
        alert(errorCode);
      }
    });
    if (loginSuccess) {
      alert("Logare completa");
      navigate("/");
    }
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      handleLogin();
    }
  }, [errors]);

  return { handleChange, values, handleSubmit, errors };
};
