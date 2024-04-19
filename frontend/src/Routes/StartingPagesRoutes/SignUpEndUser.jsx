import Button from "../../Components/SmallComponents/Button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {RegisterNewEndUser} from "../../axios/axiosEndUser.js";

const SignUpEndUser = () => {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

    const handleSignUpClick = async (e) => {
    e.preventDefault();
    try {
      await RegisterNewEndUser(email)
      localStorage.setItem('registered_email', email)
      navigate("/private-signup/congratulations");
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <>
      <div className="flex xl:items-center l:items-center justify-center sm:mt-50 md:mt-50">
        <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg">
          {/* <div className="flex justify-center mb-8">
        <img src="logo" alt="Logo" className="w-30 h-20"/>
      </div> */}
          <h2 className="mt-8 mb-6">
          </h2>
          <h1 className="text-2xl font-semibold text-center mt-8 mb-6">Join Us</h1>
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
            <ul className="steps">
              <li className="step step-secondary"></li>
              <li className="step"></li>
            </ul>
            <Button onClick={handleSignUpClick}> Register</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpEndUser;
