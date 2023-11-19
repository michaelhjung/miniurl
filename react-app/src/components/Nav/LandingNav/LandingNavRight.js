import React from "react";
import { LandingNavLink } from "./LandingNavLink";

export const LandingNavRight = () => {
  return (
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
  );
};
