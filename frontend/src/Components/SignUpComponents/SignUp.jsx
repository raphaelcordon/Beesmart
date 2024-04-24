import Button from "../../Components/SmallComponents/Button";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {RegisterNewCustomer} from "../../axios/axiosCustomer.js";
import {RegisterNewEndUser} from "../../axios/axiosEndUser.js";

const SignUp = () => {
  const [userEmail, setEmail] = useState("");
  const [userType, setUserType] = useState("")
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSignUpClick = async (e) => {
    e.preventDefault();

    try {
      if (userType === 'business') {
        await RegisterNewCustomer(userEmail);
        localStorage.setItem('registered_email', userEmail);
        navigate("/business-signup/congratulations");
      } else if (userType === 'endUser') {
        await RegisterNewEndUser(userEmail);
        localStorage.setItem('registered_email', userEmail);
        navigate("/private-signup/congratulations");
      }
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

          <form>
            <div className="mb-4">

              {/*Radio button section*/}
              <div className="flex justify-around pb-2">
                <span>
                  <input type="radio" id="business" name="userType" value="business" required
                  onChange={(e) => setUserType(e.target.value)}/>
                  <label htmlFor="business" className="pl-2">Business</label>
                </span>
                <span>
                  <input type="radio" id="endUser" name="userType" value="endUser" required
                  onChange={(e) => setUserType(e.target.value)}/>
                  <label htmlFor="endUser" className="pl-2">User</label><br/>
                </span>
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
                <Button onClick={handleSignUpClick} disabled={userEmail === "" || userType === ""}>Register</Button>
                {error && <p className="text-error text-sm mt-2">{error}</p>}</div>
            </div>

          </form>
        </div>
      </div>

    </>
  );
};

export default SignUp;

