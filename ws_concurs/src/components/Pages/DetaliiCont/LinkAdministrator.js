import React from "react";
import { Link } from "react-router-dom";

const LinkAdministrator = ({ number }) => {
  const linkPlace = `/administrator${number}`;
  if (number === 1)
    return (
      <Link className="link" to={linkPlace}>
        <li>Administrator</li>
      </Link>
    );
  else return;
};

export default LinkAdministrator;
