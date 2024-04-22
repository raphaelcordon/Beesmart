import {useEffect, useState} from "react";

const CampaignsClosed = ({ list = [] }) => {

    const [isCampaign, setIsCampaign] = useState(false);

    useEffect(() => {
        setIsCampaign(list.length !== 0);
    }, [list]);

    return (
        <div className="p-1">
            {isCampaign ? (
                list.map((item, index) => (
                    item.is_active === false && (
                            <div key={item.id || index} className="bg-gray-100 shadow-md rounded-lg p-2 my-2 max-w-md mx-auto">
                                <div class="mx-auto max-w-4xl">
                                    <div class="flex items-center bg-white p-1 rounded-lg shadow-md">
                                        <div class="flex-shrink-0">
                                            <img src={`${item.logo}`} alt="Campaign Logo" class="w-20 h-20 rounded-full p-2"/>
                                        </div>
                                    <div class=" aligne grid justify-items-end mx-auto">
                                        <h1 class="text-lg font-semibold text-gray-900">{item.name}</h1>
                                        <p class="text-sm text-gray-600"><strong>Goal:</strong>{item.value_goal}</p>
                                        <p class="text-xs text-gray-600"><strong>Beginning Date:</strong>{item.beginning_date}</p>
                                        <p class="text-xs text-gray-600"><strong>Ending Date:</strong>{item.ending_date}</p>
                                        <p class="text-xs text-gray-500"><strong>Participants</strong>1544</p>
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
                <h1>You do not have closed campaigns to show</h1>
            )}
        </div>
    )
};

export default CampaignsClosed;