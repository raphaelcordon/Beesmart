import { useState } from "react";
import Scan from "../../Components/EndUserComponents/scan.jsx";
import MyCampaigns from "../../Components/EndUserComponents/MyCampaigns.jsx";
import Profile from "../../Components/EndUserComponents/profile.jsx";
import NavBarUser from "../../Components/EndUserComponents/NavBarUser.jsx";
import MyVouchers from "../../Components/EndUserComponents/MyVouchers.jsx";

const EndUserHome = () => {
  const [activeTab, setActiveTab] = useState('MyCampaigns');

  return (
    <div className="relative min-h-screen bg-base-300">
      {/* Background element */}
      <div className="absolute inset-0 z-0"></div>

      {/* Content */}
      <div className="flex flex-col min-h-screen relative z-10">
        <NavBarUser setActiveTabProp={setActiveTab} />
        <div className="flex-grow overflow-y-auto pb-[20%] md:pb-3 pt-[10%] md:pt-0">
          {activeTab === 'Scan' && <Scan />}
          {activeTab === 'MyCampaigns' && <MyCampaigns />}
          {activeTab === 'MyVouchers' && <MyVouchers />}
          {activeTab === 'Profile' && <Profile />}
        </div>
      </div>
    </div>
  );
};

export default EndUserHome;



// import {useState} from "react";
// import Scan from "../../Components/EndUserComponents/scan.jsx";
// import MyCampaigns from "../../Components/EndUserComponents/MyCampaigns.jsx";
// import Profile from "../../Components/EndUserComponents/profile.jsx";
// import NavBarUser from "../../Components/EndUserComponents/NavBarUser.jsx";
// import MyVouchers from "../../Components/EndUserComponents/MyVouchers.jsx";

// const EndUserHome = () => {

//   const [activeTab, setActiveTab] = useState('MyCampaigns');

//   return (
//       <>
//       <div className="relative h-screen">
//                 {/* Background element */}
//                 <div className="bg-base-300 fixed inset-0 z-0">

//                 {/* Content */}
                
//                     <div className="">
//         <NavBarUser setActiveTabProp={setActiveTab} />
//         </div>
//         {/* <div className="flex flex-col h-screen relative z-10"> */}
//         <div className="flex-grow overflow-y-auto"></div>
//         {activeTab === 'Scan' && <Scan />}
//         {activeTab === 'MyCampaigns' && <MyCampaigns />}
//         {activeTab === 'MyVouchers' && <MyVouchers />}
//         {activeTab === 'Profile' && <Profile />}
//         </div>
//                 </div>
//                 {/* </div> */}
            
//       </>
//   );
// };

// export default EndUserHome;
