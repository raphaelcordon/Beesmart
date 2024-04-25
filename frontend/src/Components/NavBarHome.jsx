import { Link } from "react-router-dom";
import NavBarLink from "./SmallComponents/NavBarLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faUser } from "@fortawesome/free-solid-svg-icons";

export const NavBarHome = () => {
  return (
    <div className="navbar border border-base-300 bg-base-100/50 shadow-lg backdrop-blur-2xl fixed bottom-0 left-0 w-full z-10 md:top-0 md:bottom-auto flex justify-between">
      <div className="flex items-center w-1/2">
        <Link to="/">
          <img src="/BeeSmart_Primary_Logo.png" className="w-2/5 max-w-[122rem] h-auto max-h-[127rem]" alt="Bee Logo" />
        </Link>
      </div>
      <div className="flex items-center justify-around w-1/2 pr-5">
        <NavBarLink to="/get-started" className="flex items-center">
          <FontAwesomeIcon icon={faRocket} />
          <span>Register</span>
        </NavBarLink>
        <NavBarLink to="/login" className="flex items-center">
          <FontAwesomeIcon icon={faUser} />
          <span>Login</span>
        </NavBarLink>
      </div>
    </div>
  );
};
