import { Link } from "react-router-dom";
import NavBarLink from "./SmallComponents/NavBarLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export const NavBarHome = () => {
  const [imageSrc, setImageSrc] = useState("/BeeSmart_Primary_Logo.png");
  const [imageStyle, setImageStyle] = useState({
    width: "40%",
    height: "auto",
    minWidth: "150px",
    minHeight: "26px",
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 300) {
        setImageSrc("/BeeSmart_Final_Shadow_Bee.png");
        setImageStyle({
          width: "25%",
          height: "auto",
          minWidth: "45px",
          minHeight: "8px",
        });
      } else {
        setImageSrc("/BeeSmart_Primary_Logo.png");
        setImageStyle({
          width: "40%",
          height: "auto",
          minWidth: "150px",
          minHeight: "26px",
        });
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="navbar border border-base-300 bg-base-100/50 shadow-lg backdrop-blur-2xl fixed bottom-0 left-0 w-full z-10 md:top-0 md:bottom-auto flex justify-between">
      <div className="flex items-center w-1/2">
        <Link to="/">
          <img src={imageSrc} style={imageStyle} alt="Bee Logo" />
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
