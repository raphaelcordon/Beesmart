import { useEffect, useState } from "react";
import MyCollector from "../MyCollectorsComponents/MyCollector";

const MyCampaignsOngoing = ({ campaigns, isLoading, setIsLoading }) => {
  const [isCampaign, setIsCampaign] = useState(true);

  useEffect(() => {
    if (!campaigns) {
        setIsCampaign(false);
    }
    setIsLoading(false);
  }, [campaigns]);

  return (
    <>
      <div className="justify-center p-1 pt-20">
        {isCampaign ? (
          campaigns.map(
            (item, index) =>
              item.is_active === true && (
                <>
                  <MyCollector key={item.id} item={item} />
                </>
              ),
          )
        ) : (
          <h1>You are not yet engaged in any campaign</h1>
        )}
      </div>
    </>
  );
};

export default MyCampaignsOngoing;
