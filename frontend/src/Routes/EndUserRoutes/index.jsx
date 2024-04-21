import {useState} from "react";
import Scan from "../../Components/EndUserComponents/scan.jsx";
import MyCampaigns from "../../Components/EndUserComponents/MyCampaigns.jsx";
import Profile from "../../Components/EndUserComponents/profile.jsx";
import NavBarUser from "../../Components/EndUserComponents/NavBarUser.jsx";
import MyVouchers from "../../Components/EndUserComponents/MyVouchers.jsx";

const EndUserHome = () => {

  const [activeTab, setActiveTab] = useState('MyCampaigns');

  return (
      <>
        <NavBarUser setActiveTabProp={setActiveTab} />

        {activeTab === 'Scan' && <Scan />}
        {activeTab === 'MyCampaigns' && <MyCampaigns />}
        {activeTab === 'MyVouchers' && <MyVouchers />}
        {activeTab === 'Profile' && <Profile />}

      </>
  );
};

export default EndUserHome;
