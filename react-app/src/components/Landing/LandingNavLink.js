import React from "react";

export const LandingNavLink = ({ additionalClasses, text, link }) => {
  return (
    <a
      className={
        additionalClasses
          ? `landing-nav-link ${additionalClasses}`
          : "landing-nav-link"
      }
      href={link}
    >
      {text}
    </a>
  );
};
