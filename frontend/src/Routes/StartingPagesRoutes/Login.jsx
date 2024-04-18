import { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Button from '../../Components/SmallComponents/Button';
import useAuthenticateUser from "../../hooks/useAuthenticateUser.js";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { authenticate, AuthError } = useAuthenticateUser();
  const location = useLocation();

  const getSubmitData = async (e) => {
      e.preventDefault();
      setError(null);
      setIsLoading(true);
      try {
          await authenticate(email, password);
          const from = location.state?.from || "/business";
          navigate(from);
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
          {/* <div className="flex justify-center mb-8">
        <img src="logo" alt="Logo" className="w-30 h-20"/>
      </div> */}
          <h1 className="text-2xl font-semibold text-center mt-8 mb-6">Log In</h1>
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
            {error?.password && <p>{error.password}</p>}
            <Button disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;
