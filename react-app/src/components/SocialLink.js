import React from "react";

export const SocialLink = ({ href, icon, ariaLabel }) => {
  return (
    <a
      className="footer-link"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
    >
      {icon}
    </a>
  );
};
