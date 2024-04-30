import { useEffect, useState } from "react";
import MyCollector from "../MyCollectorsComponents/MyCollector";
import defaultlogo from "../../../assets/defaultlogo.png";
import check from "../../../assets/check.png";
import notcollected from "../../../assets/notcollected.png";

const MyCampaignsOngoing = ({ campaigns, isLoading, setIsLoading }) => {
  const [isCampaign, setIsCampaign] = useState(false);

  useEffect(() => {
    if (campaigns.length === 0) {
      setIsCampaign(false);
    }
    else {
      setIsCampaign(true);
    }
    setIsLoading(false);
  }, [campaigns]);

  return (
    <>
      <div className="justify-center p-1 pt-20 p-1 flex flex-row flex-wrap items-center justify-center align-center text-center w-dvw gap-10 ">
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
          <div>
            <h1 className=" font-bold text-yellow-500 text-xl">You are not yet engaged in any campaign</h1>
            <div className="select-none opacity-25 justify-center p-1 pt-10 p-1 flex flex-row flex-wrap items-center justify-center align-center text-center gap-10 ">
            <div className="cursor-default flex justify-center pb-10 mb-10">
              <div className="rounded-md bg-zinc-50 flex flex-col text-primary-content w-80 shadow-md">
                <div className="stat flex items-center">
                  <img src={`${defaultlogo}`} alt="Campaign Logo" className="w-16 h-16 rounded-full p-2" />
                  <div className="text-l text-left font-bold  text-lime-700">FREE COFFEE</div>
                </div>
                <div>
                  <div className="stat-title w-full ">
                    <div className="text-right text-xs h-8 pr-14">You have: 6 Stamps </div>
                  </div>
                  <div className="flex items-center justify-center min-h-24">
                    <div className="flex flex-row flex-wrap items-center justify-center rounded-lg h-32 w-80">
                      {Array.from({ length: 10 }).map((_, index) =>
                        6 > index ? (
                          <div
                            className="m-1 bg-zinc-300  border-slate-400 rounded-full w-12 h-12 flex items-center justify-center"
                            key={index}
                          >
                            <img src={check} alt="Stamp" className="opacity-50 w-11 h-11 rounded-full" />
                          </div>
                        ) : (
                          <div
                            className="m-1 bg-zinc-200 border border-slate-200 rounded-full w-12 h-12 flex items-center justify-center"
                            key={index}
                          ></div>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center pb-10 pt-5">
                    <img
                      src={notcollected}
                      alt="Campaign Logo border-slate-400 "
                      className="opacity-25 grayscale w-52 h-52"
                    />
                  </div>
                  <div className="text-xs stat-title w-full text-right pr-14 pb-4">
                    <div className="text-yellow-500">Campaign expires:</div> <div>---</div>
                  </div>
                  <div className="stat-desc"></div>
                </div>
              </div>
            </div>
            <div className=" cursor-default flex justify-center pb-10 mb-10">
              <div className="rounded-md bg-zinc-50 flex flex-col text-primary-content w-80 shadow-md">
                <div className="stat flex items-center">
                  <img src={`${defaultlogo}`} alt="Campaign Logo" className="w-16 h-16 rounded-full p-2" />
                  <div className="text-l text-left font-bold  text-lime-700">10% DISCOUNT</div>
                </div>
                <div>
                  <div className="stat-title w-full ">
                    <div className="text-xl h-8 font-bold">You need: 500 points</div>
                  </div>
                  <div className="flex items-center justify-center min-h-24">
                    <div className="flex flex-row flex-wrap items-center justify-center rounded-lg h-32 w-80">
                      <div>
                        <div className="text-slate-400 text-sm">You have:</div>
                        <div className="text-slate-600 font-bold text-4xl">220 POINTS</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center pb-10 pt-5">
                    <img
                      src={notcollected}
                      alt="Campaign Logo border-slate-400 "
                      className="opacity-25 grayscale w-52 h-52"
                    />
                  </div>
                  <div className="text-xs stat-title w-full text-right pr-14 pb-4">
                    <div className="text-yellow-500">Campaign expires:</div> <div>---</div>
                  </div>
                  <div className="stat-desc"></div>
                </div>
              </div>
            </div>
            <div className="cursor-default flex justify-center pb-10 mb-10">
              <div className="rounded-md bg-zinc-50 flex flex-col text-primary-content w-80 shadow-md">
                <div className="stat flex items-center">
                  <img src={`${defaultlogo}`} alt="Campaign Logo" className="w-16 h-16 rounded-full p-2" />
                  <div className="text-l text-left font-bold  text-lime-700">25 CHF VOUCHER</div>
                </div>
                <div>
                  <div className="stat-title w-full ">
                    <div className="text-xl h-8 font-bold">Campaign goal: 450 CHF</div>
                  </div>
                  <div className="flex items-center justify-center min-h-24">
                    <div className="flex flex-row flex-wrap items-center justify-center rounded-lg h-32 w-80">
                      <div>
                        <div className="text-slate-400 text-sm">You already spent:</div>
                        <div className="text-slate-600 font-bold text-4xl"> 140 CHF</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center pb-10 pt-5">
                    <img
                      src={notcollected}
                      alt="Campaign Logo border-slate-400 "
                      className="opacity-25 grayscale w-52 h-52"
                    />
                  </div>
                  <div className="text-xs stat-title w-full text-right pr-14 pb-4">
                    <div className="text-yellow-500">Campaign expires:</div> <div>---</div>
                  </div>
                  <div className="stat-desc"></div>
                </div>
              </div>
            </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyCampaignsOngoing;
