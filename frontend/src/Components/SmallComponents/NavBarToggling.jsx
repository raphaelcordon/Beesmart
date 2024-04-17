const NavBarToggling = ({ children, setActiveTab, tabName, active }) => {
    const className = `cursor-pointer text-sm mx-2 my-2 md:mx-10 lg:mx-8 lg:my-0 xl:mx-12 w-full p-2 flex justify-center items-center ${active ? 'bg-black md:bg-transparent text-white md:text-black' : 'bg-transparent text-black'}`;

    // This function will be called when the element is clicked.
    const handleOnClick = () => {
        setActiveTab(tabName);
    };

    return (
        <div className={className} onClick={handleOnClick}>
            {children}
        </div>
    );
};

export default NavBarToggling;
