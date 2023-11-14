import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";

const NavPrimary = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  // TODO: Replace profile button component

  return (
    <header className="nav-primary">
      <Link to="/" onClick={() => window.scrollTo(0, 0)}>
        <div className="logo-container">
          <img className="logo" src="" alt="miniurl-logo" />
        </div>
      </Link>

      <div>
        <ProfileButton currentUser={currentUser} />
      </div>
    </header>
  );
};

export default NavPrimary;
