import { useEffect, useState } from "react";
import { getCollectorByEndUser } from "../../../axios/axiosCollector";
import stamp from "../../../assets/stamp.png";
import notcollected from "../../../assets/notcollected.png";
import defaultlogo from "../../../assets/defaultlogo.png"
import check from "../../../assets/check.png"

const MyCollector = ({ item }) => {
  const [collector, setCollector] = useState({});
  const [collectorType, setCollectorType] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getCollector = async () => {
      const newCollector = await getCollectorByEndUser(item.id);
      setCollector(newCollector[0]);
      setCollectorType(item.collector_type);
      setTimeout(() => {
        setLoading(false);
      }, 950);
    };
    getCollector();
  }, [item]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center pb-20">
          <div className="rounded-md bg-zinc-50 flex flex-col text-primary-content breadcrumbs w-80 shadow-md">
            <div className="pt-64 pb-64">.....</div>
          </div>
        </div>
      ) : (
        <div key={item.id || index} className="flex justify-center w-full pb-10 mb-10">
          <div className="rounded-md bg-zinc-50 flex flex-col text-primary-content w-80 shadow-md">
            <div className="stat flex items-center">
              <img src={`${item.logo || defaultlogo}`} alt="Campaign Logo" className="w-16 h-16 rounded-full p-2" />
              <div className="text-l text-left font-bold  text-lime-700">{item.name.toUpperCase()}</div>
            </div>
            <div>
              <div className="stat-title w-full ">
                {collectorType === 1 ? (
                  <div className="text-right pr-14">Your Stamps: {collector.value_counted} </div>
                ) : collectorType === 2 ? (
                  <div className="text-xl font-bold">You need: {collector.value_goal} points</div>
                ) : (
                    <div className="text-xl font-bold">Campaign goal: {collector.value_goal} CHF</div>
                )}
              </div>
              <div className="flex items-center justify-center min-h-24">
                {console.log(item)}

                <div className="flex flex-row flex-wrap items-center justify-center rounded-lg w-80">
                  {collectorType === 1 ? (
                    Array.from({ length: collector.value_goal }).map((_, index) =>
                      collector.value_counted > index ? (
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
                    )
                  ) : collectorType === 2 ? (
                    <div>
                      <div className="text-slate-400 text-xl">You have:</div>
                      <div className="text-slate-600 font-bold text-4xl">{collector.value_counted}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-slate-400 text-sm">You already spent:</div>
                      <div className="text-slate-600 font-bold text-2xl"> {collector.value_counted}CHF</div>
                    </div>
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
                <div className="text-yellow-500">Campaign expires:</div>  {item.ending_date ? <div>{item.ending_date}</div> : <div>---</div>}
              </div>
              <div className="stat-desc"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyCollector;
