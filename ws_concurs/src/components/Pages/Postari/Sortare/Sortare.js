import React from "react";
import "./sortare.css";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
const Sortare = ({ handleSortareData, handleSortareVoturi, handleFilterInt, handleFilterProp, handleFilterProb, handleFilterLike, handleFilterBook }) => {
  return (
    <div className="cp-sortare">
      <h3>Sortare</h3>
      <div className="cp-sortare-field">
        <h4 onClick={handleSortareData}>Data adaugarii</h4>
        <AiOutlineArrowUp className="cp-sortare-arr" />
        {/* <AiOutlineArrowDown className="cp-sortare-arr" /> */}
      </div>
      <div className="cp-sortare-field">
        <h4 onClick={handleSortareVoturi}>Numarul de voturi</h4>
        <AiOutlineArrowUp className="cp-sortare-arr" />
        {/* <AiOutlineArrowDown className="cp-sortare-arr" /> */}
      </div>
      <div style={{ marginTop: "40px" }}>
        <h3>Filtrare</h3>
        <h4 onClick={handleFilterInt}>Intrebari</h4>
        <h4 onClick={handleFilterProp}>Propuneri</h4>
        <h4 onClick={handleFilterProb}>Probleme</h4>
        <h4 onClick={handleFilterLike}>Liked</h4>
        <h4 onClick={handleFilterBook}>Bookmarked</h4>
      </div>
    </div>
  );
};

export default Sortare;
