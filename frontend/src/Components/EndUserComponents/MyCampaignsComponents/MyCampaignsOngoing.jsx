import { useEffect, useState } from "react";
import MyCollector from "../MyCollectorsComponents/MyCollector";

const MyCampaignsOngoing = ({ campaigns, isLoading, setIsLoading }) => {
  const [isCampaign, setIsCampaign] = useState(false);

  useEffect(() => {
    setIsCampaign(campaigns.length !== 0);
    setIsLoading(false);
  }, [campaigns]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <div className="skeleton w-80 h-96 max-w-xl"></div>
        </div>
      ) : (
        <div className="justify-center p-1 pt-20">
          {isCampaign ? (
            campaigns.map(
              (item, index) =>
                item.is_active === true && (
                  <>
                    <MyCollector item={item} />
                  </>
                ),
            )
          ) : (
            <h1>You are not yet engaged in any campaign</h1>
          )}
        </div>
      )}
    </>
  );
};

export default MyCampaignsOngoing;
