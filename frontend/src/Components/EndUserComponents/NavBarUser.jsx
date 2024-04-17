import { Link } from "react-router-dom";
import beeLogo from "../../../public/beeicon.png";
import NavBarToggling from "../SmallComponents/NavBarToggling.jsx";
import { useEffect, useRef, useState } from "react";

const NavBarBusiness = ({ setActiveTabProp }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Scan');
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSetActiveTab = (tabName) => {
        setActiveTab(tabName);
        setActiveTabProp(tabName);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="navbar">
            <div className="navbar-start">
                <div>
                    <Link to="/">
                        <img src={beeLogo} className="h-10 w-10 sm:h-10 sm:w-10 lg:h-20 lg:w-20" alt="Bee Logo"/>
                        <p className="text-lg">BeeSmart</p>
                    </Link>
                </div>
            </div>

            {!isOpen && (
                <div className="navbar-end md:hidden">
                    <button onClick={toggleMenu} className="md:hidden">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/>
                        </svg>
                    </button>
                </div>
            )}

            <div ref={menuRef}
                 className={`navbar-center ${isOpen ? 'flex' : 'hidden md:flex'} absolute md:relative top-0 right-0 md:top-auto md:right-auto w-1/4 md:w-auto h-full md:h-auto bg-primary bg-opacity-75 md:bg-opacity-0 z-50 flex-col md:flex-row py-2 md:py-0`}>

                <NavBarToggling setActiveTab={() => handleSetActiveTab('Scan')}
                                active={activeTab === 'Scan'}
                                tabName="Scan">Scan</NavBarToggling>
                <NavBarToggling setActiveTab={() => handleSetActiveTab('MyCards')} active={activeTab === 'MyCards'}
                                tabName="MyCards">My Cards</NavBarToggling>
                <NavBarToggling setActiveTab={() => handleSetActiveTab('MyVouchers')} active={activeTab === 'MyVouchers'}
                                tabName="MyVouchers">My Vouchers</NavBarToggling>
                <NavBarToggling setActiveTab={() => handleSetActiveTab('Profile')} active={activeTab === 'Profile'}
                                tabName="Profile">Profile</NavBarToggling>

            </div>
        </div>
    );
}

export default NavBarBusiness;