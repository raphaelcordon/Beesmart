import Voucher from "./VoucherComponent";

const MyVouchersClosed = ({ usedVouchers, loading }) => {
  return (
    <>
      {usedVouchers !== null ? console.log("sssss") : console.log("rffff")}
      <div className="justify-center p-1 pt-20">
        {usedVouchers !== null ? (
          usedVouchers.map((voucher, index) => (
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

export default MyVouchersClosed;