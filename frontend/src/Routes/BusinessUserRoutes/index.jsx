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
            <div className="relative h-screen">
                {/* Background element */}
                <div className="bg-base-300 fixed inset-0 z-0"></div>

                {/* Content */}
                <div className="flex flex-col h-screen relative z-10">
                    
                        <NavBarBusiness setActiveTabProp={setActiveTab} />
                    
                    <div className="w-full flex-grow overflow-y-auto pb-[20%] md:pb-0">
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