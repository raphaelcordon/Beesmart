import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import defaultavatar from "../../assets/avatar_default.png";

const Scan = () => {

    const EndUser = useSelector(state => state.endUser.userEndUserData);
    const [first_name, setFirst_name] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [qr_code, setQr_code] = useState(null);

    useEffect(() => {
        setFirst_name(EndUser.end_user_profile.first_name)
        setAvatar(EndUser.end_user_profile.avatar)
        setQr_code(EndUser.end_user_profile.qr_code)

    }, [EndUser]);

    return (
        <div className="pt-[5%] md:pt-0">
            <section className="py-10 bg-base-100/50">
                <div className="w-full mx-auto bg-base-100 shadow-2xl p-4">

                    {/* Header */}
                    <div className="flex justify-between items-center p-4 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <div className="w-24 h-24 rounded-badge overflow-hidden bg-gray-100">
                                <img src="./../../../src/assets/devtest/Carolina.png" alt="Profile avatar"
                                     className="w-full h-full object-cover"/>
                                {/*<img src={avatar || defaultavatar} alt="Profile avatar"*/}
                                {/*     className="w-full h-full object-cover"/>*/}
                            </div>
                            <div className="text-md text-left">
                                <p className="pb-1">Hey <b>{first_name || "there"}</b>, that's your QR Code.</p>
                                <p>Just show it to the retailer, if they already work with us,
                                    they will know what to do.</p>
                            </div>
                        </div>
                    </div>

                    {/* Main */}
                    <div className="flex justify-center">
                        <div className="flex justify-center items-center m-10 p-6 bg-secondary rounded-lg">
                            {/*<img src={qr_code} alt="QR Code"/>*/}
                            <img src="./../../../src/assets/devtest/qr_cordonoutlook.com_YaUOIee.png"
                                 className="m-2"
                                 alt="QR Code"/>
                        </div>
                    </div>

                    {/*  Download the Wallet Card   */}
                    <div>
                        <div className="text-lg text-center">
                            <p>Why not make everything even easier
                                by adding the QR code to your Smart Phone's Wallet?</p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default Scan;