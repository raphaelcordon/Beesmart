import beeLogo from "../../public/beeicon.png";
import { Link } from "react-router-dom";
import NavBarLink from "./SmallComponents/NavBarLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRocket, faUser} from "@fortawesome/free-solid-svg-icons";

export const NavBarHome = () => {
  return (
    <div className="navbar border border-base-300 bg-base-100/50 shadow-lg backdrop-blur-2xl ">
      
      <div className="navbar-start">
        <div>
          <Link to="/">
            <img src={beeLogo}  className="h-20 sm:h-10 lg:h-20 " alt="Bee Logo" />
            <p className="text-xl">
  <span className="font-bold">B</span>
  <span className="font-semibold">ee</span><span className="font-bold">S</span><span className="font-semibold">mart</span>
</p>
          </Link>
        </div>
      </div>
      {/* <div className="navbar-end"> */}
      <div className="navbar-end flex py-4"> 
  <div><NavBarLink to="/get-started">
    <FontAwesomeIcon icon={faRocket} />
    <span>Get</span> <span>Started</span>
  </NavBarLink></div>
  <div className="ml-10 mr-5"> <NavBarLink to="/login">
    <FontAwesomeIcon icon={faUser}/>
    <span> LogIn</span>
  </NavBarLink></div>

        
      </div>
    </div>
  );
};
