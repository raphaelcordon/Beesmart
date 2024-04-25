import Button from "../../Components/SmallComponents/Button";
import {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import {RegisterNewCustomer} from "../../axios/axiosCustomer.js";
import {RegisterNewEndUser} from "../../axios/axiosEndUser.js";

const SignUp = () => {
  const [userEmail, setEmail] = useState("");
  const [isToggled, setIsToggled] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState('');
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

  const handleSignUpClick = async (e) => {
    e.preventDefault();
    try {
      if (isToggled === false) {
        await RegisterNewCustomer(userEmail);
        navigate("/business-signup/congratulations");
      } else if (isToggled === true) {
        await RegisterNewEndUser(userEmail);
        navigate("/private-signup/congratulations");
      }
      localStorage.setItem('registered_email', userEmail);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("This email is already registered");
      }
      console.log(error);
    }
  };

  return (
      <>

        <div className="flex xl:items-center l:items-center justify-center sm:mt-50 md:mt-50">
          <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg">

            <form onSubmit={handleSignUpClick}>
              <div className="mb-4">
                <div className="flex items-center justify-center gap-4 pb-2">
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

                <h4 className="mt-4 mb-5 text-center">You will receive a confirmation in your e-mail address.</h4>

                <label htmlFor="email" className="block text-center mb-2 text-sm text-accent-content">
                  Enter your e-mail
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={userEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-center"
                    required
                />

                <div className="mt-8 mb-6 text-center">
                  <Button onClick={handleSignUpClick} disabled={userEmail === "" || isToggled === null}>Register</Button>
                  {error && <p className="text-error text-sm mt-2">{error}</p>}</div>
              </div>

            </form>
          </div>
        </div>
      </>

  );
};

export default SignUp;

