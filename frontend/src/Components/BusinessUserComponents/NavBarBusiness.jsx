import { Link, NavLink, useNavigate } from "react-router-dom";
//import beeLogo from "../../../public/beeicon.png";
import NavBarToggling from "../SmallComponents/NavBarToggling.jsx";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserCustomer } from "../../store/slices/userCustomerSlice.js";
import useGetMeUser from "../../Hooks/useGetMeUser.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

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

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (menuRef.current && !menuRef.current.contains(event.target)) {
    //             setIsOpen(false);
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

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
        <> {/* Logout button for mobile users */}
        <div className="absolute top-3 right-3 p-2 sm:hidden text-3xl">
            <NavLink to="/" onClick={(e) => {
                      e.preventDefault();
                      logoutHandler();
                      navigate("/");
                    }}><FontAwesomeIcon icon={faRightFromBracket} />
                </NavLink>
        </div>

        <div className="navbar border border-base-300 bg-base-100/50 shadow-lg backdrop-blur-2xl fixed bottom-0 left-0 w-full z-10 md:relative md:flex md:justify-between sm:justify-around">
            {/* <div className="navbar-start">
                <div>
                    <Link to="/business">
                        <img src={beeLogo} className="h-10 w-10 sm:h-10 sm:w-10 lg:h-20 lg:w-20" alt="Bee Logo"/>
                        <p className="text-lg">BeeSmart</p>
                    </Link>
                </div>
            </div> */}

            <div ref={menuRef}
                //  className="navbar-center flex md:flex-row absolute md:relative top-0 right-0 md:top-auto md:right-auto w-full md:w-auto h-full md:h-auto bg-primary bg-opacity-75 md:bg-opacity-0 z-50 py-2 md:py-0">
                //className="navbar border border-base-300 bg-base-100/50 shadow-lg backdrop-blur-2xl fixed bottom-0 left-0 w-full z-10 md:relative md:flex md:justify-between sm:justify-around">
                >

                <NavBarToggling setActiveTab={() => handleSetActiveTab('MyCampaigns')}
                                active={activeTab === 'MyCampaigns'}
                                tabName="MyCampaigns">Campaigns</NavBarToggling>
                <NavBarToggling setActiveTab={() => handleSetActiveTab('Insights')} active={activeTab === 'Insights'}
                                tabName="Insights">Insights</NavBarToggling>
                <NavBarToggling setActiveTab={() => handleSetActiveTab('QrCode')} active={activeTab === 'QrCode'}
                                tabName="QrCode">QR Code</NavBarToggling>
                <NavBarToggling setActiveTab={() => handleSetActiveTab('NewCampaign')}
                                active={activeTab === 'NewCampaign'}
                                tabName="NewCampaign">+ New Campaign</NavBarToggling>
                <NavBarToggling setActiveTab={() => handleSetActiveTab('Settings')} active={activeTab === 'Settings'}
                                tabName="Settings">Settings</NavBarToggling>
                                 
                <div className="hidden sm:inline-block">
                <NavLink to="/" onClick={(e) => {
                      e.preventDefault();
                      logoutHandler();
                      navigate("/");
                    }}>Logout
                </NavLink></div>
            </div>
        </div>
        </>
    );
}

export default NavBarBusiness;


// import { Link, NavLink, useNavigate } from "react-router-dom";
// import beeLogo from "../../../public/beeicon.png";
// import NavBarToggling from "../SmallComponents/NavBarToggling.jsx";
// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUserCustomer } from "../../store/slices/userCustomerSlice.js";
// import useGetMeUser from "../../Hooks/useGetMeUser.js";

// const NavBarBusiness = ({ setActiveTabProp }) => {
//     const [activeTab, setActiveTab] = useState('MyCampaigns');
//     const menuRef = useRef(null);
//     const dispatch = useDispatch();
//     const user = useSelector(state => state.customer.userCustomerData);
//     const { getUser, error } = useGetMeUser();
//     const navigate = useNavigate();

//     const handleSetActiveTab = (tabName) => {
//         setActiveTab(tabName);
//         setActiveTabProp(tabName);
//     };

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (menuRef.current && !menuRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     useEffect(() => {
//         if ((!user || (Array.isArray(user) && user.length === 0)) && window.localStorage.getItem("accessToken")) {
//             getUser();
//         }
//     }, [user, getUser]);

//     const logoutHandler = () => {
//         dispatch(logoutUserCustomer());
//         window.localStorage.removeItem("accessToken")
//     };

//     return (
//         <div className="navbar border border-base-300 bg-base-100/50 shadow-lg backdrop-blur-2xl fixed bottom-0 left-0 w-full z-10 md:relative md:flex md:justify-between sm:justify-around">
//             <div className="navbar-start">
//                 <div>
//                     <Link to="/business">
//                         <img src={beeLogo} className="h-10 w-10 sm:h-10 sm:w-10 lg:h-20 lg:w-20" alt="Bee Logo"/>
//                         <p className="text-lg">BeeSmart</p>
//                     </Link>
//                 </div>
//             </div>

//             <div ref={menuRef}
//                  className="navbar-center flex md:flex-row absolute md:relative top-0 right-0 md:top-auto md:right-auto w-full md:w-auto h-full md:h-auto bg-primary bg-opacity-75 md:bg-opacity-0 z-50 py-2 md:py-0">

//                 <NavBarToggling setActiveTab={() => handleSetActiveTab('MyCampaigns')}
//                                 active={activeTab === 'MyCampaigns'}
//                                 tabName="MyCampaigns">My Campaigns</NavBarToggling>
//                 <NavBarToggling setActiveTab={() => handleSetActiveTab('Insights')} active={activeTab === 'Insights'}
//                                 tabName="Insights">Insights</NavBarToggling>
//                 <NavBarToggling setActiveTab={() => handleSetActiveTab('QrCode')} active={activeTab === 'QrCode'}
//                                 tabName="QrCode">QR Code</NavBarToggling>
//                 <NavBarToggling setActiveTab={() => handleSetActiveTab('NewCampaign')}
//                                 active={activeTab === 'NewCampaign'}
//                                 tabName="NewCampaign">+ New Campaign</NavBarToggling>
//                 <NavBarToggling setActiveTab={() => handleSetActiveTab('Settings')} active={activeTab === 'Settings'}
//                                 tabName="Settings">Settings</NavBarToggling>
//             </div>
            
//             <div className="navbar-end  absolute top-0 right-0 mt-2 mr-2">
//                 <NavLink to="/" onClick={(e) => {
//                       e.preventDefault();
//                       logoutHandler();
//                       navigate("/");
//                     }}>Logout
//                 </NavLink>
//             </div>
//         </div>
//     );
// }

// export default NavBarBusiness;