import React from "react";
import { NavLogo } from "../NavLogo";
import { LandingNavRight } from "./LandingNavRight";

export const LandingNav = () => {
  return (
    <header className="top-nav">
      <NavLogo />
      <LandingNavRight />
    </header>
  );
};
