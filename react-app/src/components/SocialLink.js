import React from 'react';

function SocialLink({ href, icon, ariaLabel }) {
  return (
    <a className="footer-link" href={href} target="_blank" rel="noreferrer" aria-label={ariaLabel}>
      {icon}
    </a>
  );
}

export default SocialLink;
