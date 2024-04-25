import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useAuthenticateUser from "../../Hooks/useAuthenticateUser.js";
import Button from "../../Components/SmallComponents/Button.jsx";
import {GetMeUser} from "../../axios/axiosEndUser.js";
import useAuthenticateEndUser from "../../Hooks/useAuthenticateEndUser.js";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { authenticateCustomer,  } = useAuthenticateUser();
    const { authenticateEndUser,  } = useAuthenticateEndUser();
    const location = useLocation();
    const [isToggled, setIsToggled] = useState(null);
    const toggleRef = useRef(null);

    useEffect(() => {
    // Directly manipulate the DOM to set indeterminate state on mount
    if (toggleRef.current) {
      toggleRef.current.indeterminate = true;
    }
  }, []);
  const handleToggle = () => {
    const checkbox = toggleRef.current;
    if (checkbox.indeterminate) {
      checkbox.indeterminate = false;
      setIsToggled(false); // Start with 'business' by default when moving from indeterminate
    } else {
      setIsToggled(!isToggled);
    }
  };

    const getSubmitData = async (e) => {
      e.preventDefault();
      setError(null);
      setIsLoading(true);
      try {
          if (isToggled === false) {
              await authenticateCustomer(email, password);
              const from = location.state?.from || "/business";
              navigate(from);
          }
          else {
              await authenticateEndUser(email, password);
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

                    <div className="flex items-center justify-center gap-4 pb-4">
                        <label
                            className={`font-medium ${toggleRef.current && !toggleRef.current.indeterminate && !isToggled ? "text-yellow-600 font-bold" : "text-gray-400"}`}>
                            Business
                        </label>
                        <input type="checkbox" className="toggle" id="toggleUserType" ref={toggleRef}
                               onChange={handleToggle}/>
                        <label
                            className={`font-medium ${toggleRef.current && !toggleRef.current.indeterminate && isToggled ? "text-yellow-600 font-bold" : "text-gray-400"}`}>
                            User
                        </label>
                    </div>

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
                            <Button disabled={isLoading || email === "" || password === "" || isToggled === null}>
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