import {useState} from "react";
import LoginBusiness from "../../Components/LoginComponents/LoginBusiness.jsx";
import LoginEndUser from "../../Components/LoginComponents/LoginEndUser.jsx";

const Login = () => {
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
                    <h1 className="text-2xl font-semibold text-center mt-8 mb-6">Login as:</h1>
                    <div className="flex justify-around mb-6">
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'business' ? 'bg-secondary text-base-100' : 'bg-neutral-content/50'}`}
                            onClick={() => toggleTab('business')}>
                            Business
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'user' ? 'bg-secondary text-base-100' : 'bg-neutral-content/50'}`}
                            onClick={() => toggleTab('user')}>
                            User
                        </button>
                    </div>

                    {activeTab === 'business' && <LoginBusiness/>}
                    {activeTab === 'user' && <LoginEndUser/>}


                </div>
            </div>
        </>
    )
}
export default Login;