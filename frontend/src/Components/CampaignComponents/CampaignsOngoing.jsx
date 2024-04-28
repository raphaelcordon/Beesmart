import { useEffect, useState } from "react";

import defaultlogo from "../../assets/defaultlogo.png";

import { Link } from "react-router-dom";

const CampaignsOngoing = ({ list = [], isLoading }) => {
  const [isCampaign, setIsCampaign] = useState(true);

  useEffect(() => {
    setIsCampaign(list.length !== 0);
  }, [list]);

  return (
    <>
      {isLoading ? (
        <div className="p-1 flex flex-row items-center justify-center align-center text-center ">
          <div className="flex justify-center  pb-10 mb-10">
            <div className="rounded-md bg-zinc-50 flex flex-col text-primary-content breadcrumbs w-80 shadow-md">
              <div className="pt-64 pb-64">
                <span className="loading loading-ball loading-lg">dddd</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-1 flex flex-row flex-wrap items-center justify-center align-center text-center w-dvw gap-10 ">
          {isCampaign ? (
            list.map(
              (item, index) =>
                item.is_active === true && (
                    <div key={item.id || index} className="cursor-default hover:drop-shadow-xl flex justify-center  pb-10 mb-10">
                      <div className="rounded-md bg-zinc-50 flex flex-col text-primary-content w-80 shadow-md">
                        <div className="stat flex items-center flex justify-between">
                          <img
                            src={`${item.logo || defaultlogo}`}
                            alt="Campaign Logo"
                            className="w-16 h-16 rounded-full p-2 text-right"
                          />
                          <div className="text-2xl text-wrap text-right stat-value">{item.name.toUpperCase()}</div>
                        </div>
                        <div>
                          <div className="stat-title w-full flex flex-col">
                            {item.collector_type === 1 ? (
                              <div className="stat-title w-full flex flex-row flex justify-between">
                                <div className="p-4">
                                  <div className="text-slate-600 text-l">Campaign goal: </div>
                                  <div className="text-slate-600 font-bold text-xl">{item.value_goal} stamps</div>
                                </div>
                                <div className="p-4">
                                  <div className="text-slate-600 text-l">Campaign Ends: </div>
                                  <div className="text-slate-600 font-bold text-xl">{item.ending_date ? item.ending_date : "Permanent"}</div>
                                </div>
                              </div>
                            ) : item.collector_type === 2 ? (
                              <div className="stat-title w-full flex flex-row flex justify-between">
                                <div className="p-4">
                                  <div className="text-slate-600 text-l">Campaign goal: </div>
                                  <div className="text-slate-600 font-bold text-xl">{item.value_goal} points</div>
                                </div>
                                <div className="p-4">
                                  <div className="text-slate-600 text-l">Campaign Ends: </div>
                                  <div className="text-slate-600 font-bold text-xl">{item.ending_date ? item.ending_date : "Permanent"}</div>
                                </div>
                              </div>
                            ) : (
                              <div className="stat-title w-full flex flex-row flex justify-between">
                                <div className="p-4">
                                  <div className="text-slate-600 text-l">Campaign goal: </div>
                                  <div className="text-slate-600 font-bold text-xl">{item.value_goal} CHF</div>
                                </div>
                                <div className="p-4">
                                  <div className="text-slate-600 text-l">Campaign Ends: </div>
                                  <div className="text-slate-600 font-bold text-xl">{item.ending_date ? item.ending_date : "Permanent"}</div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-center min-h-24">
                            <div className="flex flex-row flex-wrap items-center justify-center rounded-lg w-80">
                              {item.collector_type === 1 ? (
                                <div>
                                  <div className="stat-title">Participants</div>
                                  <div className="stat-value text-primary">{item.participants}</div>
                                  <div className="stat-title pt-5">Stamps Collected</div>
                                  <div className="stat-value text-secondary">{item.value ? item.value : <div>0</div>}</div>
                                  <div className="stat-title pt-5">Vouchers issued</div>
                                  <div className="stat-value">{item.vouchers_issued}</div>
                                </div>
                              ) : item.collector_type === 2 ? (
                                <div>
                                  <div className="stat-title">Participants</div>
                                  <div className="stat-value text-primary">{item.participants}</div>
                                  <div className="stat-title pt-5">Points Collected</div>
                                  <div className="stat-value text-secondary">{item.value ? item.value : <div>0</div>}</div>
                                  <div className="stat-title pt-5">Vouchers issued</div>
                                  <div className="stat-value">{item.vouchers_issued}</div>
                                </div>
                              ) : (
                                <div>
                                  <div className="stat-title">Participants</div>
                                  <div className="stat-value text-primary">{item.participants}</div>
                                  <div className="stat-title pt-5">Money Spent</div>
                                  <div className="stat-value text-secondary">{item.value ? item.value : <div>0</div>}</div>
                                  <div className="stat-title pt-5">Vouchers issued</div>
                                  <div className="stat-value">{item.vouchers_issued}</div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-center pb-10 pt-5">
                            <Link to={`/business/${item.id}`}>
                              <button className="btn btn-success w-64">Get More Insights</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default CampaignsOngoing;
