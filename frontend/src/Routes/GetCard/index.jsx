import tick from "../../assets/check-mark-forcongratulationsection.png";
import {useState} from "react";
import {useParams} from 'react-router-dom';
import {PostEndUserVerify} from "../../axios/axiosEndUser.js";
import Button from "../../Components/SmallComponents/Button.jsx";


const GetCard = () => {

    let {id} = useParams();
    const [password, setPassword] = useState('');
    const [password_repeat, setPassword_repeat] = useState('');

    const [verified, setVerified] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const getSubmitData = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Check if passwords match
        if (password !== password_repeat) {
            setError('Passwords do not match.');
            return;
        }

        const userData = {
            secret_key: id,
            password: password,
            password_repeat: password_repeat
        }
        verifyEndUser(userData);
    }

    const verifyEndUser = async (userData) => {
        try {
            const data = await PostEndUserVerify({userData});
            const url = window.URL.createObjectURL(new Blob([data], {type: 'application/vnd.apple.pkpass'}));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'BeeSmart.pkpass');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setVerified(true)
        } catch (error) {
            setError(error.message || 'Failed to register. Please try again.');
            setVerified(false)
        }
        setIsLoading(false);
  };

return (
        <div className="flex items-center justify-center">
            <div className="flex xl:items-center l:items-center justify-center sm:mt-p md:mt-50p">
                <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg flex flex-col items-center">
                    <form className="mb-10" onSubmit={getSubmitData}>
                        <div className="mb-2">
                            <label className="block mb-2 text-sm text-accent-content">Password</label>
                            <input
                                name="password"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block mb-2 text-sm text-accent-content">Confirm Password</label>
                            <input
                                name="password_repeat"
                                id="password_repeat"
                                type="password"
                                value={password_repeat}
                                onChange={(e) => setPassword_repeat(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                                required
                            />
                        </div>
                        <Button type="submit">Set Password</Button>
                    </form>
                    {isLoading ? "Verifying email..." :
                        (verified ? (
                            <div>
                                <img src={tick} className="w-16 sm:w-24 md:w-40 lg:w-40 xl:w-48" alt="Tick"/>
                                <h2 className="mt-8 mb-6">Your email was successfully verified.</h2>
                            </div>
                        ) : (
                            <div>
                                <h2 className="mt-8 mb-6">Your email could not be verified.</h2>
                                {error && <small>{String(error)}</small>}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default GetCard;