import React from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import "./sortareSwipe.css";

export const SortareSwipe = ({
  handleToggle,
  handleSortareData,
  handleSortareVoturi,
  handleFilterInt,
  handleFilterProp,
  handleFilterProb,
  handleFilterLike,
  handleFilterBook,
}) => {
  return (
    <div className="container-swipeSortare">
      <FaBars className="bars" color="white" onClick={handleToggle} />
      {/* <h3>Sortare</h3> */}
      <div className="ss-dubla">
        <h4 onClick={handleSortareData}>Data adaugarii</h4>
        <AiOutlineArrowUp className="cp-sortare-arr" />
        {/* <AiOutlineArrowDown className="cp-sortare-arr" /> */}
      </div>
      <div className="ss-dubla">
        <h4 onClick={handleSortareVoturi}>Numarul de voturi</h4>
        {/* <AiOutlineArrowUp className="cp-sortare-arr" /> */}
        <AiOutlineArrowDown className="cp-sortare-arr" />
      </div>

      {/* <h3>Filtrare</h3> */}
      <h4 onClick={handleFilterInt}>Intrebari</h4>
      <h4 onClick={handleFilterProp}>Propuneri</h4>
      <h4 onClick={handleFilterProb}>Probleme</h4>
      <h4 onClick={handleFilterLike}>Liked</h4>
      <h4 onClick={handleFilterBook}>Bookmarked</h4>
    </div>
  );
};
