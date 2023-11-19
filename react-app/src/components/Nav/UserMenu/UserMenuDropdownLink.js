import React from "react";
import { NavLink } from "react-router-dom";

export const UserMenuDropdownLink = ({ text, clickHandler, link }) => {
  if (link) {
    return (
      <NavLink to={link} className="user-menu-dropdown-link">
        {text}
      </NavLink>
    );
  }

  return (
    <button className="user-menu-dropdown-button" onClick={clickHandler}>
      {text}
    </button>
  );
};
