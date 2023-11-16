import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { NavLogo } from "./NavLogo";

const NavPrimary = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  // TODO: Replace profile button component

  return (
    <header className="nav-primary">
      <NavLogo />

      <div>
        <ProfileButton currentUser={currentUser} />
      </div>
    </header>
  );
};

export default NavPrimary;
