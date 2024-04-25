import { useEffect, useState } from "react";
import { getCollectorByEndUser } from "../../../axios/axiosCollector";
import stamp from "../../../assets/stamp.png";
import notcollected from "../../../assets/notcollected.png";

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
        <div className="flex justify-center pb-10">
          <div className="rounded-md bg-zinc-100 flex flex-col text-primary-content breadcrumbs w-80 shadow-md">
            <div className="pt-64 pb-64">.....</div>
          </div>
        </div>
      ) : (
        <div key={item.id || index} className="flex justify-center w-full mb-10">
          <div className="rounded-md bg-zinc-100 flex flex-col text-primary-content shadow-md">
            <div className="stat flex">
              <img src={`${item.logo}`} alt="Campaign Logo" className="w-12 h-12 rounded-full p-2" />
              <div className="text-3xl font-bold text-yellow-500">{item.name}</div>
            </div>
            <div>
              <div className="stat-title w-full text-right pr-14">
                {collectorType === 1 ? <>Your Stamps: {collector.value_counted} </> : <></>}
              </div>
              <div className="flex items-center justify-center h-40">
                {console.log(item)}

                <div className="flex flex-row flex-wrap items-center justify-center rounded-lg w-80">
                  {collectorType === 1 ? (
                    Array.from({ length: collector.value_goal }).map((_, index) =>
                      collector.value_counted > index ? (
                        <div
                          className="m-1 bg-zinc-300 border-2 border-slate-400 rounded-full w-12 h-12 flex items-center justify-center"
                          key={index}
                        >
                          <img
                            src={stamp}
                            alt="Stamp"
                            className="opacity-75 grayscale w-11 h-11 rounded-full"
                          />
                        </div>
                      ) : (
                        <div
                          className="m-1 bg-zinc-200 border border-slate-200 rounded-full w-12 h-12 flex items-center justify-center"
                          key={index}
                        ></div>
                      ),
                    )
                  ) : collectorType === 2 ? (
                    <div className="text-slate-200 text-2xl">Your points: {collector.value_counted}</div>
                  ) : (
                    <div className="text-slate-200 text-2xl">You already spent: {collector.value_counted}CHF</div>
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
              <div className="text-xs stat-title w-full text-right pr-14 pb-4">Campaign expires: {item.ending_date ? <div>{item.ending_date}</div> : <div className="text-xs stat-title w-full text-right pr-14 pb-4">No expiration date</div>}</div>
              <div className="stat-desc"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyCollector;
