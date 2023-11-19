import React from "react";

export const UserMenuButton = ({ currentUser, toggleDropdown }) => {
  return (
    <button className="user-menu-button" onClick={toggleDropdown}>
      {currentUser.username}
    </button>
  );
};
