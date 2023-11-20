import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLogo } from "./NavLogo";
import { UserMenu } from "./UserMenu/UserMenu";

export const NavPrimary = ({ currentUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return navigate("/");
  }, [currentUser, navigate]);

  return (
    <header className="top-nav">
      <NavLogo currentUser={currentUser} />

      <div>
        <UserMenu currentUser={currentUser} />
      </div>
    </header>
  );
};
