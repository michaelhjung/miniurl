import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLogo } from "./NavLogo";
import { UserMenu } from "./UserMenu/UserMenu";

export const NavPrimary = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return navigate("/");
  }, [currentUser, navigate]);

  return (
    <header className="top-nav">
      <NavLogo />

      <div>
        <UserMenu currentUser={currentUser} />
      </div>
    </header>
  );
};
