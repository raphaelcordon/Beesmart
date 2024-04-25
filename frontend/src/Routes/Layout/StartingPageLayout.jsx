import { NavBarHome } from "../../Components/NavBarHome";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function Layout() {
  // const [navbarHeight, setNavbarHeight] = useState(0);

  // useEffect(() => {
  //   // Function to measure and set the navbar height
  //   const updateNavbarHeight = () => {
  //     const navbar = document.querySelector(".navbar");
  //     if (navbar) {
  //       setNavbarHeight(navbar.offsetHeight);
  //     }
  //   };

  //   // Initial update
  //   updateNavbarHeight();

  //   // Update on window resize
  //   window.addEventListener("resize", updateNavbarHeight);

  //   // Clean up
  //   return () => window.removeEventListener("resize", updateNavbarHeight);
  // }, []);

  return (
    <div className="relative min-h-screen bg-base-300">
      {/* Background element */}
      <div className="absolute inset-0 z-0"></div>

      {/* Content */}
      <div className="flex flex-col min-h-screen relative z-10">
        <NavBarHome/>
        <div className="flex-grow overflow-y-auto pb-[20%] md:pb-0 pt-[10%]">
        <Outlet />
      </div>
    </div>
    </div>
  );
}

export default Layout;
