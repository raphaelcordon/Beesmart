import InsightCampaign from "../InsightComponents/InsightCampaign.jsx";
import { useEffect, useState } from "react";
import { getAllOpenCampaigns } from "../../axios/axiosCampaign.js";
import defaultlogo from "../../assets/defaultlogo.png";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Insights = () => {
    const [openCampaigns, setOpenCampaigns] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasActiveCampaigns, setHasActiveCampaigns] = useState(false);
    const [insightsVisibility, setInsightsVisibility] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setIsLoading(true);
            try {
                const data = await getAllOpenCampaigns();
                setOpenCampaigns(data);
                const visibility = {};
                data.forEach(campaign => {
                    visibility[campaign.id] = false; // All campaigns are initially not visible
                });
                setInsightsVisibility(visibility);
                setHasActiveCampaigns(data.some(campaign => campaign.is_active));
            } catch (error) {
                setError(error.message || "Failed to load insights. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleToggleInsights = id => {
        setInsightsVisibility(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-full">
                   <span className="loading loading-ball loading-lg">Loading...</span>
               </div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (!hasActiveCampaigns) {
        return <div className="text-center">There are no campaigns in progress for you at the moment.</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-stretch justify-center text-center w-full">
            <div className="w-full lg:flex-grow">
                <h1 className="text-lg lg:text-xl font-bold mb-4">Insights of Open Campaigns</h1>
                {openCampaigns.filter(campaign => campaign.is_active).map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md mb-4 cursor-pointer hover:bg-yellow-50 transition-colors duration-300"
                         onClick={() => handleToggleInsights(item.id)}>
                        <div className="p-4 flex flex-col lg:flex-row w-full">
                            <div className="lg:w-1/4">
                                <img src={item.logo || defaultlogo} alt="Campaign Logo" className="w-16 h-16 rounded-full mx-auto"/>
                                <div className="text-md font-semibold">{item.name.toUpperCase()}</div>
                            </div>
                            <div className="flex-grow p-4 lg:flex lg:items-center lg:justify-between">
                                <div className="lg:flex lg:flex-1 lg:justify-center lg:items-center">
                                    <div className="mb-2 lg:mb-0">
                                        <div className="text-gray-600">Campaign goal:</div>
                                        <div className="font-bold">{item.value_goal} {item.collector_type === 1 ? 'stamps' : 'points'}</div>
                                    </div>
                                </div>
                                <div className="lg:flex lg:flex-1 lg:justify-center lg:items-center">
                                    <div className="mb-2 lg:mb-0">
                                        <div className="text-gray-600">Campaign Ends:</div>
                                        <div className="font-bold">{item.ending_date ? item.ending_date : "Permanent"}</div>
                                    </div>
                                </div>
                                <div className="lg:flex lg:flex-1 lg:justify-center lg:items-center">
                                    <a className="inline-block mt-8 bg-secondary text-white font-semibold py-2 px-4 rounded
                                                hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary-darker
                                                focus:ring-opacity-50 cursor-pointer transition-colors duration-300">
                                        {insightsVisibility[item.id] ? (
                                            <>
                                                <FontAwesomeIcon icon={faArrowUp}/> Close insights
                                            </>
                                        ) : (
                                            <>
                                                <FontAwesomeIcon icon={faArrowDown}/> See insights
                                            </>
                                        )}
                                    </a>
                                </div>
                            </div>
                        </div>
                        {insightsVisibility[item.id] && (
                            <div className="w-full bg-white rounded-lg shadow-lg p-4">
                                <InsightCampaign isLoading={isLoading} campaign={item}/>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Insights;