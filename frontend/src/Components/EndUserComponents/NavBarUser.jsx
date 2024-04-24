import {Link, useNavigate} from "react-router-dom";
import beeLogo from "../../../public/beeicon.png";
import NavBarToggling from "../SmallComponents/NavBarToggling.jsx";
import { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {logoutUserEndUser} from "../../store/slices/userEndUserSlice.js";
import useGetMeEndUser from "../../Hooks/useGetMeEndUser.js";


const NavBarBusiness = ({ setActiveTabProp }) => {
    const [isOpen, setIsOpen] = useState(false);
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

                <NavBarToggling setActiveTab={() => handleSetActiveTab('MyCampaigns')} active={activeTab === 'MyCampaigns'}
                                tabName="MyCampaigns">My Campaigns</NavBarToggling>
                <NavBarToggling setActiveTab={() => handleSetActiveTab('MyVouchers')} active={activeTab === 'MyVouchers'}
                                tabName="MyVouchers">My Vouchers</NavBarToggling>
                <NavBarToggling setActiveTab={() => handleSetActiveTab('Scan')}
                                active={activeTab === 'Scan'}
                                tabName="Scan">Scan</NavBarToggling>
                <NavBarToggling setActiveTab={() => handleSetActiveTab('Profile')} active={activeTab === 'Profile'}
                                tabName="Profile">Profile</NavBarToggling>
                <Link to="/" onClick={(e) => {
                      e.preventDefault();
                      logoutHandler();
                      navigate("/");
                    }}>Logout
                </Link>
            </div>
        </div>
    );
}

export default NavBarBusiness;