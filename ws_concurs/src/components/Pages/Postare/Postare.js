import { getAuth } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../../firebase";
import Navbar from "../../NavBar/navBar";
import "./Postare.css";
import validateAP from "./validateAP";
const Postare = () => {
  const [count, setCount] = useState(0);
  const [values, setValues] = useState({
    titlu:"",
    tproblema:"",
    pozeVideo:[],
    descriere:"",
    grad:0
  })
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
    const { name } = e.target;
    const fileU = e.target.files;
    // const fileArr=Array.from(fileU);
    // console.log(fileArr[0]);
    setValues({
      ...values,
      [name]: fileU,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateAP(values));
    setIsSubmitting(true);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
        console.log("OKKKK");
        const auth = getAuth();
        const user = auth.currentUser;
    
        const doChestie = async() => {
          if(user){

            const addInfo = async () => {
              const infoRef = doc(db, "posts", user.uid);
              try {
                await setDoc(infoRef, {
                  titlu:values.titlu,
                  tproblema:values.tproblema,
                  descriere:values.descriere,
                  grad:values.grad,
                  owner:user.uid
                });
                const forImage = async (imagine) => {
                  const imageRef = ref(storage, `imagesPostari/${imagine}`);
                  const snapI = await uploadBytes(imageRef, imagine);
                  const iURL = await getDownloadURL(imageRef);
                  const infoRef = doc(db, "posts", user.uid);
                  await updateDoc(infoRef, { [`img${count}`]: iURL });
                  setCount(count+1);
                };
                // const array = Array.from(values.pozeVideo);
                // array.forEach(poza=>
                // )
                const filesp=values.pozeVideo;
                for(let i=0; i<filesp.length; i++){
                  await forImage(values.pozeVideo[i]);
                }
                alert("Postare Creata");
                navigate("/");
              } catch (error) {
                alert(error);
              }
            };
            await addInfo();

          }
        }
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
            <select value={values.tproblema} name="tproblema" onChange={handleChange}>
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

          <div className="cp-field">
            <label>Grad urgenta</label>
            <input type="range" min="0" max="5" className="range-urg" name="grad" value={values.grad} onChange={handleChange}/>
            {errors.grad && <p>{errors.grad}</p>}

          </div>
          <button className="creeaza-postare" type="submit">
            Creeaza postare
          </button>
        </form>
      </div>
    </div>
  );
};

export default Postare;
