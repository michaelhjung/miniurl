import { Link } from "react-router-dom";

export const NavLogo = () => {
  return (
    <Link to="/" onClick={() => window.scrollTo(0, 0)}>
      <div className="logo-container">
        <img className="logo" src="" alt="miniurl-logo" />
      </div>
    </Link>
  );
};
