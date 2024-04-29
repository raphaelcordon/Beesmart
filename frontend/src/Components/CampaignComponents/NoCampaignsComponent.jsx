import defaultlogo from "../../assets/defaultlogo.png";

const NoCampaignComponent = () => {
  return (
    <div className="p-12 flex opacity-25 select-none flex-col lg:flex-row items-center justify-center align-center w-[100%] text-center gap-10 flex-wrap">
      <div className="cursor-default flex justify-center  pb-10 mb-10 ">
        <div className="rounded-md bg-zinc-50 flex flex-col text-primary-content w-[100%] shadow-md">
          <div className="stat flex items-center  justify-between">
            <img src={`${defaultlogo}`} alt="Campaign Logo" className="w-16 h-16 rounded-full p-2 text-right" />
            <div className="text-2xl text-wrap text-right stat-value">FREE COFFEE</div>
          </div>
          <div>
            <div className="stat-title w-full flex flex-col">
              <div className="stat-title w-full flex flex-row justify-between">
                <div className="p-4">
                  <div className="text-slate-600 text-l">Campaign goal: </div>
                  <div className="text-slate-600 font-bold text-xl">10 stamps</div>
                </div>
                <div className="p-4">
                  <div className="text-slate-600 text-l">Campaign Ends: </div>
                  <div className="text-slate-600 font-bold text-xl">08-25-2024</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center min-h-24">
              <div className="flex flex-row flex-wrap items-center justify-center rounded-lg w-80">
                <div>
                  <div className="stat-title">Participants</div>
                  <div className="stat-value text-primary">2845</div>
                  <div className="stat-title pt-5">Stamps Collected</div>
                  <div className="stat-value text-secondary">7089</div>
                  <div className="stat-title pt-5">Vouchers issued</div>
                  <div className="stat-value">239</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pb-10 pt-5"></div>
          </div>
        </div>
      </div>
      <div className="cursor-default flex justify-center  pb-10 mb-10">
        <div className="rounded-md bg-zinc-50 flex flex-col text-primary-content w-80 shadow-md">
          <div className="stat flex items-center justify-between">
            <img src={`${defaultlogo}`} alt="Campaign Logo" className="w-16 h-16 rounded-full p-2 text-right" />
            <div className="text-2xl text-wrap text-right stat-value">10% DISCOUNT</div>
          </div>
          <div>
            <div className="stat-title w-full flex flex-col">
              <div className="stat-title w-full flex flex-row  justify-between">
                <div className="p-4">
                  <div className="text-slate-600 text-l">Campaign goal: </div>
                  <div className="text-slate-600 font-bold text-xl">500 points</div>
                </div>
                <div className="p-4">
                  <div className="text-slate-600 text-l">Campaign Ends: </div>
                  <div className="text-slate-600 font-bold text-xl">08-25-2024</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center min-h-24">
              <div className="flex flex-row flex-wrap items-center justify-center rounded-lg w-80">
                <div>
                  <div className="stat-title">Participants</div>
                  <div className="stat-value text-primary">6624</div>
                  <div className="stat-title pt-5">Points Collected</div>
                  <div className="stat-value text-secondary">98,388</div>
                  <div className="stat-title pt-5">Vouchers issued</div>
                  <div className="stat-value">168</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pb-10 pt-5"></div>
          </div>
        </div>
      </div>

      <div className="cursor-default flex justify-center  pb-10 mb-10">
        <div className="rounded-md bg-zinc-50 flex flex-col text-primary-content w-80 shadow-md">
          <div className="stat flex items-center justify-between">
            <img src={`${defaultlogo}`} alt="Campaign Logo" className="w-16 h-16 rounded-full p-2 text-right" />
            <div className="text-2xl text-wrap text-right stat-value">25 CHF VOUCHER</div>
          </div>
          <div>
            <div className="stat-title w-full flex flex-col">
              <div className="stat-title w-full flex flex-row  justify-between">
                <div className="p-4">
                  <div className="text-slate-600 text-l">Campaign goal: </div>
                  <div className="text-slate-600 font-bold text-xl">300 CHF</div>
                </div>
                <div className="p-4">
                  <div className="text-slate-600 text-l">Campaign Ends: </div>
                  <div className="text-slate-600 font-bold text-xl">08-25-2024</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center min-h-24">
              <div className="flex flex-row flex-wrap items-center justify-center rounded-lg w-80">
                <div>
                  <div className="stat-title">Participants</div>
                  <div className="stat-value text-primary">2036</div>
                  <div className="stat-title pt-5">Money Spent</div>
                  <div className="stat-value text-secondary">9,660</div>
                  <div className="stat-title pt-5">Vouchers issued</div>
                  <div className="stat-value">98</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pb-10 pt-5"></div>
          </div>
          
        </div>
      </div>
      
    </div>
    
  );
};

export default NoCampaignComponent;
