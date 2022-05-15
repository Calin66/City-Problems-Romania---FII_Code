import React from "react";
import { Link } from "react-router-dom";

const LinkAdministrator = ({ number }) => {
  const linkPlace = `/administrator`;
  if (number === "admin")
    return (
      <Link className="link" to={linkPlace}>
        <li>Administrator</li>
      </Link>
    );
  else return;
};

export default LinkAdministrator;
