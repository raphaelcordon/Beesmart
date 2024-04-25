import Voucher from "./VoucherComponent";

const MyVouchersClosed = ({ usedVouchers, loading }) => {
  return (
    <>
      {usedVouchers !== null ? console.log("sssss") : console.log("rffff")}
      <div className="justify-center p-1 pt-8 p-1 flex flex-row flex-wrap items-center justify-center align-center text-center gap-10 ">
        {usedVouchers !== null ? (
          usedVouchers.map((voucher, index) => (
            <div className=" opacity-50">
              <Voucher key={voucher.id} loading={loading} voucher={voucher} />
            </div>
          ))
        ) : (
          <h1>You are not yet engaged in any campaign</h1>
        )}
      </div>
    </>
  );
};

export default MyVouchersClosed;
