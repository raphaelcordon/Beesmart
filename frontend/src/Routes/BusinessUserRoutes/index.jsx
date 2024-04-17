import NavBarBusiness from "../../Components/BusinessUserComponents/NavBarBusiness.jsx";
import MyCampaigns from "../../Components/BusinessUserComponents/MyCampaigns.jsx";
import QrCode from "../../Components/BusinessUserComponents/QrCode.jsx";
import Insights from "../../Components/BusinessUserComponents/Insights.jsx";
import NewCampaign from "../../Components/BusinessUserComponents/NewCampaign.jsx";
import Settings from "../../Components/BusinessUserComponents/Settings.jsx";
import {useState} from "react";

const BusinessUserHome = () => {

    const [activeTab, setActiveTab] = useState('MyCampaigns');

  return (
      <>
        <NavBarBusiness setActiveTabProp={setActiveTab} />

        {activeTab === 'MyCampaigns' && <MyCampaigns />}
        {activeTab === 'Insights' && <Insights />}
        {activeTab === 'QrCode' && <QrCode />}
        {activeTab === 'NewCampaign' && <NewCampaign />}
        {activeTab === 'Settings' && <Settings />}

      </>

  )
};

export default BusinessUserHome;
