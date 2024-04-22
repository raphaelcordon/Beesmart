import Button from "../../Components/SmallComponents/Button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {RegisterNewEndUser} from "../../axios/axiosEndUser.js";

const SignUpEndUser = () => {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState('');

    const handleSignUpClick = async (e) => {
    e.preventDefault();
    try {
      await RegisterNewEndUser(email)
      localStorage.setItem('registered_email', email)
      navigate("/private-signup/congratulations");
    } catch (errors) {
      setError(errors)
      console.log(errors);
    }
  };

  return (
    <>
      <div className="flex xl:items-center l:items-center justify-center sm:mt-50 md:mt-50">
        <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg">

          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm text-accent-content">
                Enter your E-mail
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
              />
            </div>
            <div className="mt-8 mb-6">
              <ul className="steps">
                <li className="step step-secondary"></li>
                <li className="step"></li>
              </ul>
            </div>

              <Button onClick={handleSignUpClick}> Register</Button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpEndUser;
