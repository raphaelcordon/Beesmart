import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const EndUserCongratulationsSection = () => {
  const userEmail = localStorage.getItem("registered_email");

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex xl:items-center l:items-center justify-center sm:mt-p md:mt-50p">
          <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg flex flex-col items-center">
            {/* <div className="flex justify-center mb-8">
        <img src="logo" alt="Logo" className="w-30 h-20"/>
      </div> */}
            <FontAwesomeIcon icon={faCheck} className="text-8xl text-secondary"/>
            
            <h2 className="mt-8 mb-6">We’ve sent you an email to get your Card:</h2> 
            {userEmail} 
            <div className="mt-8 mb-6">
              <ul className="steps">
                <li className="step step-secondary"></li>
                <li className="step step-secondary"></li>
              </ul>
            </div>
            <Link to="/business-signup/verification">
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EndUserCongratulationsSection;
