import React from "react";
import { NavLogo } from "./NavLogo";
import { LandingNavRight } from "./LandingNavRight";

export const LandingNav = () => {
  return (
    <header className="landing-nav">
      <NavLogo />
      <LandingNavRight />
    </header>
  );
};
