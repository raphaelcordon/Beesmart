import NavBarBusiness from "../../Components/BusinessUserComponents/NavBarBusiness.jsx";
import MyCampaigns from "../../Components/BusinessUserComponents/MyCampaigns.jsx";
import QrCode from "../../Components/BusinessUserComponents/QrCode.jsx";
import Insights from "../../Components/BusinessUserComponents/Insights.jsx";
import NewCampaign from "../../Components/BusinessUserComponents/NewCampaign.jsx";
import Settings from "../../Components/BusinessUserComponents/Settings.jsx";
import { useState } from "react";

const BusinessUserHome = () => {
    const [activeTab, setActiveTab] = useState('MyCampaigns');

    return (
        <>
            <div className="relative min-h-screen bg-base-300">
      {/* Background element */}
      <div className="absolute inset-0 z-0"></div>

                {/* Content */}
                <div className="flex flex-col min-h-screen relative z-10">
                    
                        <NavBarBusiness setActiveTabProp={setActiveTab} />
                        
                    
                    <div className="w-full flex-grow pb-[23%] pt-[2%] md:pb-3">
                        {activeTab === 'MyCampaigns' && <MyCampaigns />}
                        {activeTab === 'Insights' && <Insights />}
                        {activeTab === 'QrCode' && <QrCode />}
                        {activeTab === 'NewCampaign' && <NewCampaign />}
                        {activeTab === 'Settings' && <Settings />}
                    </div>
                    </div>
            </div>
        </>
    );
};

export default BusinessUserHome;