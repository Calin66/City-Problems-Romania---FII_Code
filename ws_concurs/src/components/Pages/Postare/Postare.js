import { getAuth } from "firebase/auth";
import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../../firebase";
import Navbar from "../../NavBar/navBar";
import "./Postare.css";
import validateAP from "./validateAP";
import { v4 as uuid } from "uuid";

const Postare = () => {
  const [count, setCount] = useState(0);
  const [urls, setUrls] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [photoPostC, setPhotoPostC] = useState();
  const [values, setValues] = useState({
    titlu: "",
    tproblema: "intrebari",
    pozeVideo: [],
    descriere: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setValues({ ...values, pozeVideo: e.target.files });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("macar");
    setErrors(validateAP(values));
    setIsSubmitting(true);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      console.log("Is Submitting");
      const auth = getAuth();
      const user = auth.currentUser;
      const unique_id = uuid();

      const doChestie = async () => {
        if (user) {
          const addInfo = async () => {
            const infoRef = doc(db, "posts", unique_id);
            try {
              console.log("Am inceput");
              await setDoc(infoRef, {
                titlu: values.titlu,
                tproblema: values.tproblema,
                descriere: values.descriere,
                owner: user.uid,
                data: Timestamp.fromDate(new Date()),
                upvotes: 0,
                downvotes: 0,
              });
              const forImage = async (imagine, i) => {
                const unique_id2 = uuid();
                const imageRef = ref(
                  storage,
                  `imagesPostari/${unique_id2}` + `${imagine.name}`
                );
                const snapI = await uploadBytes(imageRef, imagine);
                const iURL = await getDownloadURL(imageRef);
                urls[i] = iURL;
                console.log("updateDoc");
              };
              const filesp = values.pozeVideo;
              for (let i = 0; i < filesp.length; i++) {
                console.log(`try${i}`);
                await forImage(values.pozeVideo[i], i);
              }
              await updateDoc(infoRef, { urls: urls });
              alert("Postare Creata");
              navigate("/");
            } catch (error) {
              alert(error);
            }
          };
          await addInfo();
        }
      };
      doChestie();
    }
  }, [errors]);
  return (
    <div className="container-creeazapostare">
      <Navbar backgroundColor="black" />
      <h1 id="h1-crp">Creaza postare</h1>
      <div className="cp-fields">
        <form onSubmit={handleSubmit} className="cp-form-fields" noValidate>
          <div className="cp-field">
            <label>Titlul postarii</label>
            <input
              placeholder="Ce problema ai sesizat?"
              value={values.titlu}
              onChange={handleChange}
              name="titlu"
            />
            {errors.titlu && <p>{errors.titlu}</p>}
          </div>
          <div className="cp-field">
            <label>Tip problema</label>
            <select
              value={values.tproblema}
              name="tproblema"
              onChange={handleChange}
            >
              <option value="intrebari">Intrebari</option>
              <option value="propuneri">Propuneri</option>
              <option value="probleme">Probleme</option>
            </select>
            {errors.tproblema && <p>{errors.tproblema}</p>}
          </div>
          <div className="cp-field">
            <label>Adauga poze/video</label>
            <input
              type="file"
              style={{ marginTop: "2vh" }}
              multiple
              onChange={handleImageChange}
              name="pozeVideo"
            />
            {errors.pozeVideo && <p>{errors.pozeVideo}</p>}
          </div>
          <div className="cp-field">
            <label>Descriere postare</label>
            <textarea
              style={{ marginTop: "1vh", height: "10vh", padding: " 5px 10px" }}
              value={values.descriere}
              name="descriere"
              onChange={handleChange}
              placeholder="Descrie mai detaliat problema pe care ai sesizat-o"
            ></textarea>
            {errors.descriere && <p>{errors.descriere}</p>}
          </div>
          {/* <div className="cp-field">
            <label>Categorie</label>
          </div> */}

          {/* <div className="cp-field">
            <label>Grad urgenta</label>
            <input
              type="range"
              min="0"
              max="5"
              className="range-urg"
              name="grad"
              value={values.grad}
              onChange={handleChange}
            />
            {errors.grad && <p>{errors.grad}</p>}
          </div> */}
          <button className="creeaza-postare" type="submit">
            Creeaza postare
          </button>
        </form>
      </div>
    </div>
  );
};

export default Postare;
