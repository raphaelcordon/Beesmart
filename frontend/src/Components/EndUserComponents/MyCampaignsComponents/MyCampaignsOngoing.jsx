import { useEffect, useState } from "react";
import MyCollector from "../MyCollectorsComponents/MyCollector";

const MyCampaignsOngoing = ({ campaigns }) => {
  const [isCampaign, setIsCampaign] = useState(false);

  useEffect(() => {
    setIsCampaign(campaigns.length !== 0);
  }, [campaigns]);

  return (
    <div className="p-10">
      {isCampaign ? (
        campaigns.map(
          (item, index) =>
            item.is_active === true && (
              <>
                <div key={item.id || index} className=" max-w-3xl ">
                <div className="stats flex flex-col text-primary-content shadow-md">
                  <div className="stats bg-amber-300 text-primary-content shadow-md min-w-full ">
                    <div className="stat">
                      <div className="stat-title">Name</div>
                      <div className="stat-value">{item.name}</div>
                      <strong>Goal:</strong>
                      <div className="stat-value">{item.value_goal}</div>
                    </div>
                    <div className="stat">
                      <img src={`${item.logo}`} alt="Campaign Logo" class="w-20 h-20 rounded-full p-2" />
                      <div className="stat-title">{}</div>
                      <div className="stat-title">Started</div>
                      <div className="stat-desc">{item.beginning_date}</div>
                      <div className="stat-title">Ends</div>
                      <div className="stat-desc">{item.ending_date}</div>
                    </div>
                  </div>
                  <div>
                    <MyCollector item={item} />
                  </div>
                  </div>

                </div>
              </>
            ),
        )
      ) : (
        <h1>You are not yet engaged in any campaign</h1>
      )}
    </div>
  );
};

export default MyCampaignsOngoing;
