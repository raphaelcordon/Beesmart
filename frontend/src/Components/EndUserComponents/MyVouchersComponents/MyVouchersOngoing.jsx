import NoVoucherComponent from "./NoVoucherComponent";
import Voucher from "./VoucherComponent";

const MyVouchersOngoing = ({ activeVouchers, loading }) => {
  return (
    <>
      <div className="justify-center p-1 pt-8 p-1 flex flex-row flex-wrap items-center justify-center align-center text-center gap-10 ">
        {activeVouchers.length !== 0 ? (
          activeVouchers.map((voucher, index) => (
            <>
              <Voucher key={voucher.id} loading={loading} voucher={voucher} />
            </>
          ))
        ) : (
          <div>
            <h1 className=" font-bold text-yellow-500 text-xl">You still don't have any Vouchers!</h1>
            <div className="opacity-25 select-none justify-center p-1 pt-8 p-1 flex flex-row flex-wrap items-center justify-center align-center text-center gap-10 ">
              <NoVoucherComponent />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyVouchersOngoing;
