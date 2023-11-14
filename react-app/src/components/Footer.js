import React from "react";
import SocialLink from "./SocialLink";
import Icon from "@mdi/react";
import { mdiLinkedin, mdiGithub, mdiBriefcaseOutline } from "@mdi/js";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-copyright-container">
        <span className="footer-copyright-text">
          Copyright © 2023{" "}
          <a
            className="michael-portfolio"
            href="https://www.michaelhjung.com/"
            target="_blank"
            rel="noreferrer"
          >
            Michael Jung
          </a>
          .
        </span>
      </div>

      <div className="footer-contact">
        <SocialLink
          href="https://www.linkedin.com/in/michael-h-jung/"
          icon={<Icon path={mdiLinkedin} size={2} />}
          ariaLabel="LinkedIn"
        />
        <SocialLink
          href="https://github.com/michaelhjung"
          icon={<Icon path={mdiGithub} size={2} />}
          ariaLabel="Github"
        />
        <SocialLink
          href="https://www.michaelhjung.com/"
          icon={<Icon path={mdiBriefcaseOutline} size={2} />}
          ariaLabel="Portfolio"
        />
      </div>
    </footer>
  );
};

export default Footer;
