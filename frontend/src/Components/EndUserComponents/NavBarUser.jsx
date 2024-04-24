import {useNavigate} from "react-router-dom";
//import beeLogo from "../../../public/beeicon.png";
import NavBarToggling from "../SmallComponents/NavBarToggling.jsx";
import { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {logoutUserEndUser} from "../../store/slices/userEndUserSlice.js";
import useGetMeEndUser from "../../Hooks/useGetMeEndUser.js";
import NavBarLink from "../SmallComponents/NavBarLinks.jsx";
import { faBullhorn, faExpand, faRightFromBracket, faTicketSimple, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const NavBarBusiness = ({ setActiveTabProp }) => {
    //const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Scan');
    const menuRef = useRef(null);
    const dispatch = useDispatch();
    const user = useSelector(state => state.endUser.userEndUserData);
    const { getUser, error } = useGetMeEndUser();
    const navigate = useNavigate();
    const secretKey = user?.end_user_profile?.secret_key;

    useEffect(() => {
        if ((!user || (Array.isArray(user) && user.length === 0)) && window.localStorage.getItem("accessToken")) {
            getUser();
        }
    }, [user, getUser]);



    // const toggleMenu = () => {
    //     setIsOpen(!isOpen);
    // };

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


    const logoutHandler = () => {
    dispatch(logoutUserEndUser());
    window.localStorage.removeItem("accessToken")
    };


    return (


<>
 {/* Logout button for mobile users */}
 <div className="absolute top-3 right-3 p-2 sm:hidden text-3xl">
 <NavBarLink to="/" onClick={(e) => {
           e.preventDefault();
           logoutHandler();
           navigate("/");
         }}><FontAwesomeIcon icon={faRightFromBracket} />
     </NavBarLink>
     </div>



        <div className="navbar border border-base-300 bg-base-100/50 shadow-lg backdrop-blur-2xl fixed bottom-0 left-0 w-full z-10 md:relative md:flex md:justify-between sm:justify-around">
            {/* <div className="navbar-start"> */}
                {/* <div>
                    <Link to={`/user/${secretKey}`}>
                        <p className="text-lg">BeeSmart</p>
                    </Link>
                </div> */}
            {/* </div> */}

            {/* {!isOpen && (
                <div className="navbar-end md:hidden">
                    <button onClick={toggleMenu} className="md:hidden">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/>
                        </svg>
                    </button>
                </div>
            )} */}

            <div ref={menuRef}
                 className="navbar-start">
                    {/* <div className="flex justify-between"> */}
                    {/* <div className="ml-0 sm:ml-2"> */}

                <NavBarToggling setActiveTab={() => handleSetActiveTab('MyCampaigns')} active={activeTab === 'MyCampaigns'}
                                tabName="MyCampaigns"><FontAwesomeIcon icon={faBullhorn} />Campaigns</NavBarToggling>
                                <div  className="mx-5" >
                <NavBarToggling setActiveTab={() => handleSetActiveTab('MyVouchers')} active={activeTab === 'MyVouchers'}
                                tabName="MyVouchers">
                                    <FontAwesomeIcon icon={faTicketSimple} />Vouchers</NavBarToggling></div></div>
                                    <div className="navbar-end md:navbar-center">
                <div  className="block lg:hidden mx-6" >
                <NavBarToggling setActiveTab={() => handleSetActiveTab('Scan')}
                                active={activeTab === 'Scan'}
                                tabName="Scan"><FontAwesomeIcon icon={faExpand} />Scan</NavBarToggling></div>
                                <div  className="mx-5" >
                <NavBarToggling setActiveTab={() => handleSetActiveTab('Profile')} active={activeTab === 'Profile'}
                                tabName="Profile"><FontAwesomeIcon icon={faUser} />Profile</NavBarToggling></div></div>
                <div className="hidden sm:inline-block">
                <NavBarLink to="/" onClick={(e) => {
                      e.preventDefault();
                      logoutHandler();
                      navigate("/");
                    }}><FontAwesomeIcon icon={faRightFromBracket} />
                    <span>
                         Logout
                         </span>
                </NavBarLink>
                </div>
                </div>
                {/* </div> */}
            
        {/* </div> */}
        </>
    );
}

export default NavBarBusiness;