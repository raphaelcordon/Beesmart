import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../../Components/SmallComponents/Button';
import useApiRequest, {GetMyBusinessPRofileData} from '../../axios/useApiRequestBusinessUser';
import { loginUser } from '../../store/slices/loggedInUser';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const res = await useApiRequest.post('/auth/token/', {
        email,
        password,
      })
      const token = res.data.access
      navigate('/')
      dispatch(loginUser(token))
      window.localStorage.setItem('token', token)
      const user = await GetMyBusinessPRofileDataa(token)
      dispatch(userObject(user.data))
    } catch (errors) {
      setError(errors.response.data.detail)
    } finally {
      setIsLoading(false)
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
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm text-accent-content">
                E-mail
              </label>
              <input
                placeholder="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm text-accent-content">
                Password
              </label>
              <input
                 placeholder="Password"
                 type="password"
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            {error?.password && <p>{error.password}</p>}
            <Button onSubmit={handleLogin}>Login</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
