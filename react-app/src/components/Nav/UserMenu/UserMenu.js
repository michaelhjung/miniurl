import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/users";
import { UserMenuDropdown } from "./UserMenuDropdown";
import { UserMenuButton } from "./UserMenuButton";

export const UserMenu = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const userMenuRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown((prevShowMenu) => !prevShowMenu);
  };
  const closeDropdown = () => setShowDropdown(false);

  const handleLogoutClick = (e) => {
    e.stopPropagation();
    dispatch(logout());
    window.location = "/";
  };

  useEffect(() => {
    if (!showDropdown) return;

    const handleOutsideClick = (event) => {
      if (!userMenuRef?.current?.contains(event.target)) closeDropdown();
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [showDropdown]);

  return (
    <div ref={userMenuRef} className="relative">
      <UserMenuButton
        currentUser={currentUser}
        toggleDropdown={toggleDropdown}
      />

      <UserMenuDropdown
        showDropdown={showDropdown}
        handleLogoutClick={handleLogoutClick}
      />
    </div>
  );
};
