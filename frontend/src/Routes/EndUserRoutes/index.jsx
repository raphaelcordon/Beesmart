import {useState} from "react";
import Scan from "../../Components/EndUserComponents/scan.jsx";
import MyCards from "../../Components/EndUserComponents/MyCards.jsx";
import Profile from "../../Components/EndUserComponents/profile.jsx";
import NavBarUser from "../../Components/EndUserComponents/NavBarUser.jsx";
import MyVouchers from "../../Components/EndUserComponents/MyVouchers.jsx";

const EndUserHome = () => {

  const [activeTab, setActiveTab] = useState('MyCampaigns');

  return (
      <>
        <NavBarUser setActiveTabProp={setActiveTab} />

        {activeTab === 'Scan' && <Scan />}
        {activeTab === 'MyCards' && <MyCards />}
        {activeTab === 'MyVouchers' && <MyVouchers />}
        {activeTab === 'Profile' && <Profile />}

      </>
  );
};

export default EndUserHome;
