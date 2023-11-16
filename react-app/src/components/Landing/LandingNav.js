import React from "react";
import { NavLogo } from "../NavLogo";
import { LandingNavLink } from "./LandingNavLink";

export const LandingNav = () => {
  return (
    <header className="landing-nav">
      <NavLogo />

      <div>
        <LandingNavLink
          additionalClasses="login-link"
          text="Log in"
          link="/login"
        />
        <LandingNavLink
          additionalClasses="signup-link"
          text="Sign up"
          link="/signup"
        />
      </div>
    </header>
  );
};
