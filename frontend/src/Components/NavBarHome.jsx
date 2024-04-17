import beeLogo from '../../public/beeicon.png';


export const NavBarHome = () => {
  return (
    <div className="navbar">
      <div className="navbar-start">
        <div>
          <img src={beeLogo} className="h-10 w-10 sm:h-10 sm:w-10 lg:h-20 lg:w-20" alt="Bee Logo" />
          <a className="text-l">BeeSmart</a>
        </div>
      </div>

      <div className="navbar-center flex flex-wrap justify-center md:justify-between items-center py-4">
        <button className="text-xl mx-2 my-2 md:mx-10 lg:mx-8 lg:my-0 xl:mx-12">LogIn</button>
        <button className="text-xl mx-2 my-2 md:mx-10 lg:mx-8 lg:my-0 xl:mx-12">Sign Up</button>
        <button className="text-xl mx-2 my-2 md:mx-10 lg:mx-8 lg:my-0 xl:mx-12">Business</button>
      </div>
    </div>
  );
};
