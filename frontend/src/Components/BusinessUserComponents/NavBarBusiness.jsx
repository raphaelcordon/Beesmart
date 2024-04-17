import { Link } from "react-router-dom";
import beeLogo from "../../../public/beeicon.png";
import NavBarToggling from "../SmallComponents/NavBarToggling.jsx";
import { useEffect, useRef, useState } from "react";

const NavBarBusiness = ({ setActiveTabProp }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('MyCampaigns');
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

                <NavBarToggling setActiveTab={() => handleSetActiveTab('MyCampaigns')}
                                active={activeTab === 'MyCampaigns'}
                                tabName="MyCampaigns">My Campaigns</NavBarToggling>
                <NavBarToggling setActiveTab={() => handleSetActiveTab('Insights')} active={activeTab === 'Insights'}
                                tabName="Insights">Insights</NavBarToggling>
                <NavBarToggling setActiveTab={() => handleSetActiveTab('QrCode')} active={activeTab === 'QrCode'}
                                tabName="QrCode">QR Code</NavBarToggling>
                <NavBarToggling setActiveTab={() => handleSetActiveTab('NewCampaign')}
                                active={activeTab === 'NewCampaign'}
                                tabName="NewCampaign">+ New Campaign</NavBarToggling>
                <NavBarToggling setActiveTab={() => handleSetActiveTab('Settings')} active={activeTab === 'Settings'}
                                tabName="Settings">Settings</NavBarToggling>
            </div>
        </div>
    );
}

export default NavBarBusiness;