import { NavBarHome } from "../../Components/NavBarHome";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function Layout() {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    // Function to measure and set the navbar height
    const updateNavbarHeight = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    // Initial update
    updateNavbarHeight();

    // Update on window resize
    window.addEventListener("resize", updateNavbarHeight);

    // Clean up
    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <NavBarHome />
      <div style={{ paddingTop: `${navbarHeight}px` }} className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
