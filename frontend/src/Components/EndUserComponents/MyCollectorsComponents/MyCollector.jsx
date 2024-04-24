import { useEffect, useState } from "react";
import { getCollectorByEndUser } from "../../../axios/axiosCollector";

const MyCollector = ({ item }) => {
  const [collector, setCollector] = useState({});
  const [collectorType, setCollectorType] = useState(null);

  useEffect(() => {
    console.log(item.id);
    const getCollector = async () => {
      const newCollector = await getCollectorByEndUser(item.id);
      setCollector(newCollector[0]);
      setCollectorType(item.collector_type);
    };
    getCollector();
  }, [item]);

  return (
    <div className="flex items-center justify-center">
      {console.log(item)}

      <div className="m-3 p-1 flex flex-row flex-wrap items-center justify-center bg-gray-700 rounded-lg drop-shadow-2xl">
        {collectorType === 1 ? (
          Array.from({ length: collector.value_goal }).map((_, index) =>
            collector.value_counted >= index ? (
              <div
                className="basis-1/5 bg-orange-600 rounded-full w-6 h-12 flex items-center justify-center"
                key={index}
              >
                {index + 1}
              </div>
            ) : (
              <div
                className="basis-1/5 bg-orange-300 rounded-full w-6 h-12 flex items-center justify-center"
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
  );
};

export default MyCollector;
