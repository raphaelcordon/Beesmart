import { NavBarHome } from "../../Components/NavBarHome";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <NavBarHome />
      <Outlet />
    </>
  );
}

export default Layout;
