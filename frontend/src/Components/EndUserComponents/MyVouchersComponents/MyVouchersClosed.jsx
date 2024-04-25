import Voucher from "./VoucherComponent";

const MyVouchersClosed = ({ usedVouchers, loading }) => {
  return (
    <>
      {usedVouchers !== null ? console.log("sssss") : console.log("rffff")}
      <div className="justify-center p-1 pt-8">
        {usedVouchers !== null ? (
          usedVouchers.map((voucher, index) => (
            <>
              <Voucher className="opacity-50" key={voucher.id} loading={loading} voucher={voucher} />
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
