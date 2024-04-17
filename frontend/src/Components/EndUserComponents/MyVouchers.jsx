import {useState} from "react";
import MyVouchersOngoing from "./MyVouchersComponents/MyVouchersOngoing.jsx";
import MyVouchersClosed from "./MyVouchersComponents/MyVouchersClosed.jsx";

const MyVouchers = () => {

    const [currentVouchers, setCurrentVouchers] = useState('ongoing');

    const handleToggleVouchers = (e, cardsOption) => {
        e.preventDefault();
        cardsOption === 'ongoing' ? setCurrentVouchers('ongoing') : setCurrentVouchers('closed');
    }

    return (
        <>
            <header className="container mx-auto flex flex-row gap-4 justify-center items-center">
                <span>
                    <a href="#" onClick={(e) => {
                    handleToggleVouchers(e, 'ongoing')}}>Ongoing</a>
                </span>
                <span>
                    <a href="#" onClick={(e) => {
                    handleToggleVouchers(e, 'closed') }}>Closed</a>
                </span>
            </header>

            <main>
                {currentVouchers === 'ongoing' && (
                    <MyVouchersOngoing />
                )}

                {currentVouchers === 'closed' && (
                    <MyVouchersClosed />
                )}
            </main>
        </>
    )
}

export default MyVouchers;