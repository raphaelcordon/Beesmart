import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useAuthenticateUser from "../../Hooks/useAuthenticateUser.js";
import Button from "../../Components/SmallComponents/Button.jsx";
import {GetMeUser} from "../../axios/axiosEndUser.js";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { authenticateUser  } = useAuthenticateUser();
    const location = useLocation();


    const getSubmitData = async (e) => {
      e.preventDefault();
      setError(null);
      setIsLoading(true);
      try {
            const res = await authenticateUser(email, password);
            if (res === 'customer'){
                const from = location.state?.from || "/business";
                navigate(from);
            }
            else {
                const data = await GetMeUser()
                const from = location.state?.from || `/user/${data.end_user_profile.secret_key}`;
                navigate(from);
            }
      } catch(error) {
          setError(error.message || "Failed to login. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }


    return (
        <>
            <div className="flex items-center justify-center h-full">
                <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-semibold text-center mt-2 mb-6">Login</h1>

                    <form onSubmit={getSubmitData}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2 text-sm text-accent-content">
                                E-mail
                            </label>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-2 text-sm text-accent-content">
                                Password
                            </label>
                            <input
                                name="password"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                        </div>
                        <div className="text-center">
                            {error?.password && <p>{error.password}</p>}
                            <Button disabled={isLoading || email === "" || password === ""}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                        </div>
                    </form>
                    <div className="text-center">
                        {error && <p className="text-error text-sm mt-2">{error}</p>}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;