import React from "react";
import { SocialLink } from "./SocialLink";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner-wrapper">
        <div className="footer-links">
          <SocialLink
            href="https://www.linkedin.com/in/michael-h-jung/"
            icon={<i className="fa-brands fa-linkedin fa-2xl" />}
            ariaLabel="LinkedIn"
          />
          <SocialLink
            href="https://github.com/michaelhjung"
            icon={<i className="fa-brands fa-github fa-2xl" />}
            ariaLabel="Github"
          />
          <SocialLink
            href="https://www.michaelhjung.com/"
            icon={<i className="fa-solid fa-briefcase fa-2xl" />}
            ariaLabel="Portfolio"
          />
        </div>

        <div className="footer-copyright">
          <span className="copyright-year-name">© 2023 Miniurl</span>. Brought
          to you with <i className="fa-solid fa-heart" /> by{" "}
          <a
            className="michael-portfolio"
            href="https://www.michaelhjung.com/"
            target="_blank"
            rel="noreferrer"
          >
            Michael Jung
          </a>
        </div>
      </div>
    </footer>
  );
};
