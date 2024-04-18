// import Button from "../../../Components/SmallComponents/Button";
// import { useNavigate } from "react-router-dom";
// import useApiRequest from "../../../axios/useApiRequestBusinessUser";
// import { useEffect, useState } from "react";

// const VerificationSection = () => {
//   const registeredEmail = localStorage.getItem("registered_email");
//   const [userData, setUserData] = useState({ email: registeredEmail });
//   const navigate = useNavigate();

//   const handleInput = (e) => {
//     setUserData({ ...userData, [e.target.id]: e.target.value });
//   };

//   const { sendRequest, error, data } = useApiRequest({ auth: false });

//   const handleValidationSubmit = (e) => {
//     e.preventDefault();
//     sendRequest("patch", "users/customer/veryfi/", userData);
//   };

//   useEffect(() => {
//     if (data === "success") {
//       navigate("/");
//       localStorage.removeItem("registered_email");
//     }
//   }, [data]);
//   return (
//     <>
//       <div className="flex items-center justify-center">
//         <div className="flex xl:items-center l:items-center justify-center sm:mt-p md:mt-50p">
//           <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg mb-16">
//             <div>
//               <h1 className="text-2xl font-semibold text-center mt-8 mb-6">Verification</h1>
//             </div>
//             <form className="mb-10">
//               <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
//               <div className="mb-2">
//                   <label className="block mb-2 text-sm text-accent-content">Verification Code</label>
//                   <input
//                     name="verification Code"
//                     error={error}
//                     userData={userData}
//                     id={"code"}
//                     handleInput={handleInput}
//                     type="text"
//                     required
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label className="block mb-2 text-sm text-accent-content">Email</label>
//                   <input
//                     name="email"
//                     type="email"
//                     userData={userData}
//                     id={"email"}
//                     error={error}
//                     handleInput={handleInput}
//                     label={"E-mail"}
//                     required
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label className="block mb-2 text-sm text-accent-content">First Name</label>
//                   <input
//                     name="name"
//                     type="text"
//                     userData={userData}
//                     error={error}
//                     handleInput={handleInput}
//                     id={"first_name"}
                    
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label className="block mb-2 text-sm text-accent-content">Last Name</label>
//                   <input
//                     name="lname"
//                     type="text"
//                     userData={userData}
//                     error={error}
//                     id={"last_name"}
//                     handleInput={handleInput}
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//                     /* placeholder="Enter last name" */
              
//                   />
//                 </div>
                
                
//                 <div className="mb-2">
//                   <label className="block mb-2 text-sm text-accent-content">Adress</label>
//                   <input
//                   userData={userData}
//                   error={error}
//                   handleInput={handleInput}
//                   id={"street"}
//                     name="adress"
//                     type="text"
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//                     /* placeholder="Enter mobile number" */
//                     required
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label className="block mb-2 text-sm text-accent-content">City</label>
//                   <input
//                   userData={userData}
//                   error={error}
//                   handleInput={handleInput}
//                   id={"city"}
//                     name="city"
//                     type="text"
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//                     /* placeholder="Enter City" */
//                     required
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label className="block mb-2 text-sm text-accent-content">Postal Code</label>
//                   <input
//                   userData={userData}
//                   error={error}
//                   handleInput={handleInput}
//                   id={"zip"}
//                     name="postalcode"
//                     type="text"
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//                     /* placeholder="Enter Postal Code" */
//                     required
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label className="block mb-2 text-sm text-accent-content">Country</label>
//                   <input
//                   userData={userData}
//                   error={error}
//                   handleInput={handleInput}
//                   id={"country"}
//                     name="country"
//                     type="text"
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//                     /* placeholder="Enter Country" */
//                     required
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label className="block mb-2 text-sm text-accent-content">Password</label>
//                   <input
//                     userData={userData}
//                     label="Password"
//                     error={error}
//                     id={"password"}
//                     handleInput={handleInput}
//                     name="password"
//                     type={"password"}
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//                     /*   placeholder="Enter password" */
//                     required
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label className="block mb-2 text-sm text-accent-content">Confirm Password</label>
//                   <input
//                     userData={userData}
//                     label="Password"
//                     error={error}
//                     id={"password_repeat"}
//                     handleInput={handleInput}
//                     name="password_repeat"
//                     type={"password"}
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    
//                     required
//                   />
//                 </div>
//                 <div className="mb-10">
//                   <label className="block mb-2 text-sm text-accent-content">Upload Logo</label>
//                   <input
//                     name="logo"
//                     type="file"
//                     className="file-input file-input-secondary text-sm w-full sm:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    
//                   />
//                 </div>
//               </div>
//             </form>
//             <div className="mt-8 mb-6">
//               <ul className="steps">
//                 <li className="step step-secondary"></li>
//                 <li className="step step-secondary"></li>
//                 <li className="step step-secondary"></li>
//               </ul>
//             </div>

//             <Button onClick={handleValidationSubmit}> Continue </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default VerificationSection;



import Button from "../../../Components/SmallComponents/Button";
import { useNavigate } from "react-router-dom";
import useApiRequest from "../../../axios/useApiRequestBusinessUser";
import { useEffect, useState } from "react";

const VerificationSection = () => {
  const registeredEmail = localStorage.getItem("registered_email");
  const [userData, setUserData] = useState({ email: registeredEmail, code: '' });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const { sendRequest, error, data } = useApiRequest();

  const handleValidationSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendRequest("patch", "users/customer/veryfi/", userData);
      if (res.data === "success") {
        navigate("/");
        localStorage.removeItem("registered_email");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex xl:items-center l:items-center justify-center sm:mt-p md:mt-50p">
        <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg mb-16">
          <h1 className="text-2xl font-semibold text-center mt-8 mb-6">Verification</h1>
          <form className="mb-10">
            <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
              <div className="mb-2">
                <label className="block mb-2 text-sm text-accent-content">Verification Code</label>
                <input
                  name="verificationCode"
                  id="code"
                  type="text"
                  value={userData.code}
                  onChange={handleInput}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm text-accent-content">Email</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={handleInput}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>
              <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">First Name</label>
                  <input
                    name="name"
                    type="text"
                    value={userData.firstname}
                    
                    onChange={handleInput}
                    id={"first_name"}
                    
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">Last Name</label>
                  <input
                    name="lname"
                    type="text"
                    value={userData.lastname}
                    
                    id={"last_name"}
                    onChange={handleInput}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /* placeholder="Enter last name" */
              
                  />
                </div>
                
                
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">Adress</label>
                  <input
                  value={userData.street}
                  
                  onChange={handleInput}
                  id={"street"}
                    name="adress"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /* placeholder="Enter mobile number" */
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">City</label>
                  <input
                  
                  
                  onChange={handleInput}
                  id={"city"}
                    name="city"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /* placeholder="Enter City" */
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">Postal Code</label>
                  <input
                  
                  
                  onChange={handleInput}
                  id={"zip"}
                    name="postalcode"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /* placeholder="Enter Postal Code" */
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">Country</label>
                  <input
                  
                 
                  onChange={handleInput}
                  id={"country"}
                    name="country"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /* placeholder="Enter Country" */
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">Password</label>
                  <input
                    
                    label="Password"
                    id={"password"}
                    onChange={handleInput}
                    name="password"
                    type={"password"}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /*   placeholder="Enter password" */
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">Confirm Password</label>
                  <input
                    
                    label="Password"
                    id={"password_repeat"}
                    onChange={handleInput}
                    name="password_repeat"
                    type={"password"}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    
                    required
                  />
                  
                </div>
                <div className="mb-0">
                  <label className="block mb-2 text-sm text-accent-content">Business Name</label>
                  <input
                    
                    label="businessname"
                    id={"business_name"}
                    onChange={handleInput}
                    name="business_name"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    
                    required
                  />
                  </div><b></b>
                <div className="mb-10">
                  <label className="block mb-2 text-sm text-accent-content">Upload Logo</label>
                  <input
                    name="logo"
                    type="file"
                    className="file-input file-input-secondary text-sm px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    
                  />
                </div>
            </div>
            <div className="mt-8 mb-6">
              <ul className="steps">
                <li className="step step-secondary"></li>
                <li className="step step-secondary"></li>
                <li className="step step-secondary"></li>
              </ul>
            </div>
            <Button onClick={handleValidationSubmit}> Continue </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerificationSection;