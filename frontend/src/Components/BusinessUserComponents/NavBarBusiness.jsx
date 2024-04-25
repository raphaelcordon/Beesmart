import { NavLink, useNavigate } from "react-router-dom";
import NavBarToggling from "../SmallComponents/NavBarToggling.jsx";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserCustomer } from "../../store/slices/userCustomerSlice.js";
import useGetMeUser from "../../Hooks/useGetMeUser.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faChartLine, faCirclePlus, faQrcode, faRightFromBracket, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import NavBarLink from "../SmallComponents/NavBarLinks.jsx";
import NavBarTogglingNew from "../SmallComponents/NavBarTogglingNew.jsx";
import NavBarTogglingNewMobile from "../SmallComponents/NavBarTogglingNewMobile.jsx";

const NavBarBusiness = ({ setActiveTabProp }) => {
    const [activeTab, setActiveTab] = useState('MyCampaigns');
    const menuRef = useRef(null);
    const dispatch = useDispatch();
    const user = useSelector(state => state.customer.userCustomerData);
    const { getUser, error } = useGetMeUser();
    const navigate = useNavigate();

    const handleSetActiveTab = (tabName) => {
        setActiveTab(tabName);
        setActiveTabProp(tabName);
    };

    useEffect(() => {
        if ((!user || (Array.isArray(user) && user.length === 0)) && window.localStorage.getItem("accessToken")) {
            getUser();
        }
    }, [user, getUser]);

    const logoutHandler = () => {
        dispatch(logoutUserCustomer());
        window.localStorage.removeItem("accessToken")
    };

    return (
        <>
            {/* Logout button for mobile users */}
            <div className="absolute top-3 right-3 p-2 sm:hidden text-3xl">
                <NavLink to="/" onClick={(e) => {
                    e.preventDefault();
                    logoutHandler();
                    navigate("/");
                }}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </NavLink>
            </div>
            {/* New campaign for smaller screens */}
            <div className="fixed md:hidden bottom-12 left-1/2 transform -translate-x-1/2 z-50">
                <NavBarTogglingNewMobile setActiveTab={() => handleSetActiveTab('NewCampaign')}
                                           active={activeTab === 'NewCampaign'}
                                           tabName="NewCampaign">
                    <FontAwesomeIcon icon={faCirclePlus} style={{ fontSize: "2.5em" }} />
                </NavBarTogglingNewMobile>
            </div>

            <div className="navbar border border-base-300 bg-base-100/50 shadow-lg backdrop-blur-2xl fixed bottom-0 left-0 w-full z-10 md:relative md:flex md:justify-between sm:justify-around">

                <div ref={menuRef} className="w-full flex justify-row ">
                <div className="basis-1/4 md:basis-1/3" >
                    <NavBarToggling setActiveTab={() => handleSetActiveTab('MyCampaigns')}
                                   active={activeTab === 'MyCampaigns'}
                                   tabName="MyCampaigns">
                        <FontAwesomeIcon icon={faBell} />Campaigns
                    </NavBarToggling></div>
                    <div className="basis-1/4 md:basis-1/3" >
                    <NavBarToggling setActiveTab={() => handleSetActiveTab('Insights')}
                                   active={activeTab === 'Insights'}
                                   tabName="Insights">
                        <FontAwesomeIcon icon={faChartLine} />Insights
                    </NavBarToggling></div>
                    {/* New Campaign for lg screen */}
                    <div className="md:basis-1/3" >
                    <NavBarTogglingNew setActiveTab={() => handleSetActiveTab('NewCampaign')}
                                    active={activeTab === 'NewCampaign'}
                                    tabName="NewCampaign">
                    <FontAwesomeIcon icon={faCirclePlus} /> New 
                    <div className="block">Campaign</div>
                    </NavBarTogglingNew></div>

                    
                

                {/* <div className="navbar-end flex justify-around"> */}
                <div className="basis-1/4 md:basis-1/3" >
                    <NavBarToggling style={{ marginLeft: '10px' }} setActiveTab={() => handleSetActiveTab('QrCode')}
                                   active={activeTab === 'QrCode'}
                                   tabName="QrCode" className="">
                        <FontAwesomeIcon icon={faQrcode} />QR
                    </NavBarToggling></div>
                    <div className="basis-1/4 md:basis-1/3" >
                    <NavBarToggling setActiveTab={() => handleSetActiveTab('Settings')}
                                   active={activeTab === 'Settings'}
                                   tabName="Settings">
                        <FontAwesomeIcon icon={faScrewdriverWrench} />Settings
                    </NavBarToggling></div>
                
                </div>

                <div className="hidden sm:inline-block">
                    <NavBarLink to="/" onClick={(e) => {
                        e.preventDefault();
                        logoutHandler();
                        navigate("/");
                    }}>
                        <FontAwesomeIcon icon={faRightFromBracket} /><span> Logout</span>
                    </NavBarLink>
                </div>
                </div>
            
        </>
    );
}

export default NavBarBusiness;
