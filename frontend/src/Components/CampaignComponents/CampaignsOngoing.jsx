import {useEffect, useState} from "react";

const CampaignsOngoing = ({ list = [] }) => {

    const [isCampaign, setIsCampaign] = useState(false);

    useEffect(() => {
        setIsCampaign(list.length !== 0);
    }, [list]);

    return (
        <div className="p-10">
            {isCampaign ? (
                list.map((item, index) => (
                    item.is_active === true && (
                        <div key={item.id || index} className="bg-gray-100 shadow-md rounded-lg p-4 my-2 max-w-md mx-auto">
                                <div class="mx-auto max-w-4xl">
                                    <div class="flex items-center bg-white p-5 rounded-lg shadow-md">
                                        <div class="flex-shrink-0">
                                            <img src="https://beesmart.propulsion-learn.ch/media-files/campaign/None/logo240x240.png" alt="Campaign Logo" class="w-24 h-24 rounded-full"/>
                                        </div>
                                    <div class="ml-6">
                                        <h1 class="text-lg font-semibold text-gray-900">Coffee</h1>
                                        <p class="text-sm text-gray-600"><strong>Goal:</strong>{item.value_goal}</p>
                                        <p class="text-sm text-gray-600"><strong>Beginning Date:</strong>{item.beginning_date}</p>
                                        <p class="text-sm text-gray-600"><strong>Ending Date:</strong>{item.ending_date}</p>
                                        <p class="text-sm text-gray-500"><strong>Participants</strong>1544</p>
                                    </div>
                                </div>
                            </div>
                            {/* <div>ID: {item.id}</div>
                            <div>NAME: {item.name}</div>
                            <div>VALUE GOAL: {item.value_goal}</div>
                            <div>BEGINNING DATE: {item.beginning_date}</div>
                            <div>LOGO: {item.logo}</div> */}
                        </div>
                    )
                ))
            ) : (
                <h1>You are not yet engaged in any campaign</h1>
            )}
        </div>
    )
};

export default CampaignsOngoing;