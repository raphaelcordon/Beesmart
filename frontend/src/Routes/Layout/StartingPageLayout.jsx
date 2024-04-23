import { NavBarHome } from "../../Components/NavBarHome";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col h-screen">
    <div className="h-15">
      <NavBarHome />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
