import React from "react";
import { NavLink } from "react-router-dom";

// TODO: delete after creating new NavPrimary component

function ProfileMenuButton({ text, clickHandler, link }) {
  if (link) {
    return (
      <NavLink to={link} className="profile-menu-button">
        {text}
      </NavLink>
    );
  }

  return (
    <button className="profile-menu-button" onClick={clickHandler}>
      {text}
    </button>
  );
}

export default ProfileMenuButton;
