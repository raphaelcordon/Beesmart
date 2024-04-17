import { Link, useLocation } from "react-router-dom";

const NavBarLink = ({ to, children }) => {
  const location = useLocation();

  return (
    <Link
      to={to}
      className={`text-xl mx-2 my-2 md:mx-10 lg:mx-8 lg:my-0 xl:mx-12 ${location.pathname === to ? "underline" : ""}`}
    >
      {children}
    </Link>
  );
};

export default NavBarLink;
