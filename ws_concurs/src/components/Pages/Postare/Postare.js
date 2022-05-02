import React from "react";
import Navbar from "../../NavBar/navBar";
import "./Postare.css";
const Postare = () => {
  const handleSubmit = () => {};
  const handleChange = () => {};
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
              // value={values.titlu}
              onChange={handleChange}
              name="titlu"
            />
          </div>
          <div className="cp-field">
            <label>Tip problema</label>
            <select>
              <option value="intrebari">Intrebari</option>
              <option value="propuneri">Propuneri</option>
              <option value="probleme">Probleme</option>
            </select>
          </div>
          <div className="cp-field">
            <label>Adauga poze/video</label>
            <input
              type="file"
              style={{ marginTop: "2vh" }}
              multiple
              onChange={handleChange}
              // value={values.pozeVideo}
              name="pozeVideo"
            />
          </div>
          <div className="cp-field">
            <label>Descriere postare</label>
            <textarea
              style={{ marginTop: "1vh", height: "10vh", padding: " 5px 10px" }}
              placeholder="Descrie mai detaliat problema pe care ai sesizat-o"
            ></textarea>
          </div>
          {/* <div className="cp-field">
            <label>Categorie</label>
          </div> */}

          <div className="cp-field">
            <label>Grad urgenta</label>
            <input type="range" min="0" max="5" className="range-urg" />
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
