import InsightCampaign from "../InsightComponents/InsightCampaign.jsx";
import {useEffect, useState} from "react";
import {getAllOpenCampaigns} from "../../axios/axiosCampaign.js";
import defaultlogo from "../../assets/defaultlogo.png";

const Insights = () => {

    const [openCampaigns, setOpenCampaigns] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCampaign, setIsCampaign] = useState(true);
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
      } catch (error) {
        setError(error.message || "Failed to load insights. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    }, []);

    useEffect(() => {
    setIsCampaign(openCampaigns.length !== 0);
    }, [openCampaigns]);

    const handleToggleInsights = (id) => {
      setInsightsVisibility(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    };

    console.log(openCampaigns)

return (
    <>
      {isLoading ? (
        <div className="p-1 flex flex-row items-center justify-center align-center text-center">
          <div className="flex justify-center pb-10 mb-10">
            <div className="rounded-md bg-zinc-50 flex flex-col text-primary-content breadcrumbs w-80 shadow-md">
              <div className="pt-64 pb-64">
                <span className="loading loading-ball loading-lg">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : !isCampaign ? (
        <h1>There are no campaigns in progress for you at the moment.</h1>
      ) : (
        <div className="flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg">
            <h1>Insights of Open Campaigns</h1>

            {openCampaigns.map((item) => (
              <div key={item.id} className="rounded-md bg-zinc-50 flex flex-col text-primary-content w-100 shadow-md mb-5">
                <div className="stat flex items-center justify-around pb-0">
                  <img
                    src={item.logo || defaultlogo}
                    alt="Campaign Logo"
                    className="w-16 h-16 rounded-full p-2"
                  />
                  <div className="text-xl">{item.name.toUpperCase()}</div>
                </div>
                <div className="stat-title w-full flex flex-row justify-between p-2">
                  <div>
                    <div className="text-slate-600">Campaign goal:</div>
                    <div className="text-slate-600 font-bold text-xl">{item.value_goal} {item.collector_type === 1 ? 'stamps' : 'points'}</div>
                  </div>
                  <div>
                    <div className="text-slate-600">Campaign Ends:</div>
                    <div className="text-slate-600 font-bold text-xl">{item.ending_date ? item.ending_date : "Permanent"}</div>
                  </div>
                </div>

                   <button onClick={() => handleToggleInsights(item.id)}>
                       See insights
                   </button>
                    {insightsVisibility[item.id] && (
                      <div className="w-100">
                        <InsightCampaign isLoading={isLoading} list={openCampaigns} />
                      </div>
                    )}

              </div>
            ))}
          </div>
        </div>
      )}

    </>
  );
};

export default Insights;
