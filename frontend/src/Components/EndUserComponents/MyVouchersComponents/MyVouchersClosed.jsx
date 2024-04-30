import Voucher from "./VoucherComponent";

const MyVouchersClosed = ({ usedVouchers, loading }) => {
  return (
    <>
      <div className="justify-center p-1 pt-8 p-1 flex flex-row flex-wrap items-center justify-center align-center text-center gap-10 ">
        {usedVouchers.length !== 0 ? (
          usedVouchers.map((voucher, index) => (
            <div className=" opacity-50">
              <Voucher key={voucher.id} loading={loading} voucher={voucher} />
            </div>
          ))
        ) : (
          <h1 className="font-bold text-yellow-500 text-xl">You don't have any used vouchers.</h1>
        )}
      </div>
    </>
  );
};

export default MyVouchersClosed;
