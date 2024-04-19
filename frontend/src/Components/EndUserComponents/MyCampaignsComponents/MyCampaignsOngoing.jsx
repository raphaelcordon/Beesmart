import {useEffect, useState} from "react";

const MyCampaignsOngoing = ({ list = [] }) => {

    const [isCampaign, setIsCampaign] = useState(false);

    useEffect(() => {
        setIsCampaign(list.length !== 0);
    }, [list]);

    return (
        <div className="p-10">
            {isCampaign ? (
                list.map((item, index) => (
                    item.is_active && (
                        <div key={item.id || index} className="bg-red-500 shadow-md rounded-lg p-4 my-2 max-w-md mx-auto">
                            <div>ID: {item.id}</div>
                            <div>NAME: {item.name}</div>
                            <div>VALUE GOAL: {item.value_goal}</div>
                            <div>BEGINNING DATE: {item.beginning_date}</div>
                            <div>LOGO: {item.logo}</div>
                        </div>
                    )
                ))
            ) : (
                <h1>You are not yet engaged in any campaign</h1>
            )}

        </div>
    )
};

export default MyCampaignsOngoing;