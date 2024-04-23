import SignUpBusiness from "../../Components/SignUpComponents/SignUpBusiness.jsx";
import SignUpEndUser from "../../Components/SignUpComponents/SignUpEndUser.jsx";
import {useState} from "react";

const GetStarted = () => {
    const [activeTab, setActiveTab] = useState('');

    // Function to toggle between tabs
    const toggleTab = (tabName) => {
        if (activeTab === tabName) {
            // Clicking the same tab again will close it
            setActiveTab('');
        } else {
            setActiveTab(tabName);
        }
    };



    return (
        <>
            <div className="flex items-center justify-center h-full">
                <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-semibold text-center mt-8 mb-6">I wish to create an account as</h1>
                    <div className="flex justify-around mb-6">
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'business' ? 'bg-secondary text-base-100' : 'bg-neutral-content/50'}`}
                            onClick={() => toggleTab('business')}>
                            Business
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'user' ? 'bg-secondary text-base-100' : 'bg-neutral-content/500'}`}
                            onClick={() => toggleTab('user')}>
                            User
                        </button>
                    </div>

                    {activeTab === 'business' && <SignUpBusiness/>}
                    {activeTab === 'user' && <SignUpEndUser/>}


                </div>
            </div>
        </>
    )
}
export default GetStarted;