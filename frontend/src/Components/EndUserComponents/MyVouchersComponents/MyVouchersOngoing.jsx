import Voucher from "./VoucherComponent";

const MyVouchersOngoing = ({ activeVouchers, loading }) => {
  return (
    <>
      {activeVouchers !== null ? console.log("sssss") : console.log("rffff")}
      <div className="justify-center p-1 pt-8 p-1 flex flex-row flex-wrap items-center justify-center align-center text-center w-dvw gap-10 ">
        {activeVouchers !== null ? (
          activeVouchers.map((voucher, index) => (
            <>
              <Voucher key={voucher.id} loading={loading} voucher={voucher} />
            </>
          ))
        ) : (
          <h1>You are not yet engaged in any campaign</h1>
        )}
      </div>
    </>
  );
};

export default MyVouchersOngoing;
