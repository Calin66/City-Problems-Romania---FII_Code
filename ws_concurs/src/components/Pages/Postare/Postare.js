import React from "react";
import Navbar from "../../NavBar/navBar";
import "./Postare.css";
const Postare = () => {
  return (
    <div className="container-creeazapostare">
      <Navbar backgroundColor="black" />
      <h1
        style={{
          fontSize: "30px",
          zIndex: "100",
          position: "absolute",
          top: "15vh",
          left: "10%",
        }}
      >
        Creaza postare
      </h1>
      <div className="cp-fields">
        <form noValidate>
          <div>
            <label>Ce problema ai gasit?</label>
            <input />
          </div>
          <div>
            <label>Tip problema</label>
          </div>
          <div>
            <label>Adauga poze/video</label>
            <input type="file" />
          </div>
          <div>
            <label>Descrie mai detaliat</label>
            <textarea></textarea>
          </div>
          <div>
            <label>Categorie</label>
            {/* aici faceti voi un submenu de catogerii - vedeti in figma ce categorii si puteti sa mai adaugati */}
          </div>
          <div>
            <label>Grad urgenta</label>
            <input type="range" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Postare;
