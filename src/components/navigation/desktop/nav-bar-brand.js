import React from "react";
import { NavLink } from "react-router-dom";

export const NavBarBrand = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/">
        <img
          className="nav-bar__logo"
          src="https://s3.us-west-2.amazonaws.com/davidbmar.com/mic2.webp"
          alt="Transcription Logo"
          width="50"
          height="50"
        />
      </NavLink>
    </div>
  );
};
