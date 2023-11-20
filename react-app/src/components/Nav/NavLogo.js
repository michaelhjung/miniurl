import { Link } from "react-router-dom";
import miniLinkLogo from "../../assets/link-mini.svg"; // TODO: temporary, update to real logo

export const NavLogo = ({ currentUser }) => {
  return (
    <Link
      to={currentUser ? "/dashboard" : "/"}
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className="logo-container">
        <img className="logo" src={miniLinkLogo} alt="miniurl-logo" />
      </div>
    </Link>
  );
};
