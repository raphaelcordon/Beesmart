import beeLogo from "../../public/beeicon.png";
import { Link } from "react-router-dom";
import NavBarLink from "./SmallComponents/NavBarLinks";

export const NavBarHome = () => {
  return (
    <div className="navbar">
      <div className="navbar-start">
        <div>
          <Link to="/">
            <img src={beeLogo} className="h-10 w-10 sm:h-10 sm:w-10 lg:h-20 lg:w-20" alt="Bee Logo" />
            <a className="text-l">BeeSmart</a>
          </Link>
        </div>
      </div>

      <div className="navbar-center flex flex-wrap justify-center md:justify-between items-center py-4">
        <NavBarLink to="/login">LogIn</NavBarLink>
        <NavBarLink to="/private-signup">Sign Up</NavBarLink>

        
        <NavBarLink to="/business-signup">Business</NavBarLink>
      </div>
    </div>
  );
};
