import React from "react";

export const UserMenuButton = ({ currentUser, toggleDropdown }) => {
  return (
    <button className="button user-menu-button" onClick={toggleDropdown}>
      {currentUser.username}
    </button>
  );
};
