import MyVouchersOngoing from "./MyVouchersComponents/MyVouchersOngoing.jsx";
import MyVouchersClosed from "./MyVouchersComponents/MyVouchersClosed.jsx";
import { useEffect, useState } from "react";
import { getActiveUserVouchers } from "../../axios/axiosVouchers";
import { getUsedUserVouchers } from "../../axios/axiosVouchers.js";

const MyVouchers = () => {
  const [currentVouchers, setCurrentVouchers] = useState("ongoing");
  const [loading, setLoading] = useState(true);
  const [activeVouchers, setActiveVouchers] = useState(null);
  const [usedVouchers, setUsedVouchers] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getVouchers = async () => {
      const activeVouchers = await getActiveUserVouchers();
      const usedVouchers = await getUsedUserVouchers();
      setActiveVouchers(activeVouchers);
      console.log(activeVouchers);
      setUsedVouchers(usedVouchers);
      setTimeout(() => {
        setLoading(false);
      }, 950);
    };
    getVouchers();
  }, []);

  const handleToggleVouchers = (e, cardsOption) => {
    e.preventDefault();
    cardsOption === "ongoing" ? setCurrentVouchers("ongoing") : setCurrentVouchers("closed");
  };

  return (
    <>
      <header className="container mx-auto flex flex-row gap-4 justify-center items-center">
        <span className="">
          <a
            href="#"
            onClick={(e) => {
              handleToggleVouchers(e, "ongoing");
            }}
          >
            <button className="btn btn-primary w-24">Active</button>
          </a>
        </span>
        <span>
          <a
            href="#"
            onClick={(e) => {
              handleToggleVouchers(e, "closed");
            }}
          >
            <button className="btn btn-neutral w-24">Closed</button>
          </a>
        </span>
      </header>
      {loading ? (
        <div className="flex justify-center pt-8 pb-20">
          <div className="rounded-md bg-zinc-50 flex flex-col text-primary-content breadcrumbs w-80 shadow-md">
            <div className="pt-64 pb-64">
              <span className="loading loading-ball loading-lg"></span>
            </div>
          </div>
        </div>
      ) : (
        <main>
          {currentVouchers === "ongoing" && <MyVouchersOngoing loadin={loading} activeVouchers={activeVouchers} />}

          {currentVouchers === "closed" && <MyVouchersClosed loading={loading} usedVouchers={usedVouchers} />}
        </main>
      )}
    </>
  );
};

export default MyVouchers;
