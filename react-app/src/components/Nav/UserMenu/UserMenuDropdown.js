import React from "react";
import { UserMenuDropdownLink } from "./UserMenuDropdownLink";

export const UserMenuDropdown = ({ showDropdown, handleLogoutClick }) => {
  return (
    showDropdown && (
      <ul className="user-menu-dropdown">
        <UserMenuDropdownLink
          text={"log out"}
          clickHandler={handleLogoutClick}
        />
      </ul>
    )
  );
};
