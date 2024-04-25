import {NavLink, useNavigate} from "react-router-dom";
import NavBarToggling from "../SmallComponents/NavBarToggling.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserEndUser } from "../../store/slices/userEndUserSlice.js";
import useGetMeEndUser from "../../Hooks/useGetMeEndUser.js";
import NavBarLink from "../SmallComponents/NavBarLinks.jsx";
import { faBullhorn, faExpand, faRightFromBracket, faTicketSimple, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBarUser = ({ setActiveTabProp }) => {
    const [activeTab, setActiveTab] = useState('Campaigns');
    const dispatch = useDispatch();
    const user = useSelector(state => state.endUser.userEndUserData);
    const { getUser, error } = useGetMeEndUser();
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
        dispatch(logoutUserEndUser());
        window.localStorage.removeItem("accessToken");
    };

    return (
        <>
         {/* Logout button for mobile users */}
         <div className="absolute top-3 right-3 p-2 sm:hidden text-3xl">
         <NavLink to="/" onClick={(e) => {
                   e.preventDefault();
                   logoutHandler();
                   navigate("/");
                 }}><FontAwesomeIcon icon={faRightFromBracket} />
             </NavLink>
             </div>

            <div className="navbar border border-base-300 bg-base-100/50 shadow-lg backdrop-blur-2xl fixed bottom-0 left-0 w-full z-10 md:relative md:flex md:justify-around sm:justify-around">
                <div className="w-full flex justify-around">
                    
                        <div className="w-13" >
                            <NavBarToggling
                                setActiveTab={() => handleSetActiveTab('MyCampaigns')}
                                active={activeTab === 'MyCampaigns'}
                                tabName="MyCampaigns">
                                <FontAwesomeIcon icon={faBullhorn} />Campaigns
                            </NavBarToggling>
                        </div>
                        <div className="w-13" >
                            <NavBarToggling
                                setActiveTab={() => handleSetActiveTab('MyVouchers')}
                                active={activeTab === 'MyVouchers'}
                                tabName="MyVouchers">
                                <FontAwesomeIcon icon={faTicketSimple} />Vouchers
                            </NavBarToggling>
                        </div>
                        <div className="w-13" >
                            <NavBarToggling
                                setActiveTab={() => handleSetActiveTab('Scan')}
                                active={activeTab === 'Scan'}
                                tabName="Scan">
                                <FontAwesomeIcon icon={faExpand} />Scan
                            </NavBarToggling>
                        </div>
                        <div className="w-13" >
                            <NavBarToggling
                                setActiveTab={() => handleSetActiveTab('Profile')}
                                active={activeTab === 'Profile'}
                                tabName="Profile">
                                <FontAwesomeIcon icon={faUser} />Profile
                            </NavBarToggling>
                        </div>
                    
                </div>
                <div className="hidden sm:inline-block">
                    <NavBarLink to="/" onClick={(e) => {
                        e.preventDefault();
                        logoutHandler();
                        navigate("/");
                    }}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        <span>Logout</span>
                    </NavBarLink>
                </div>
            </div>
        </>
    );
}

export default NavBarUser;