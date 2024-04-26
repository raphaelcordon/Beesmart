
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {UpdateMeUser} from "../../axios/axiosEndUser.js";
import Button from "../SmallComponents/Button.jsx";
import useGetMeEndUser from "../../Hooks/useGetMeEndUser.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCheck } from "@fortawesome/free-solid-svg-icons";
import defaultavatar from "../../assets/avatar_default.png"


const Profile = () => {

  const EndUser = useSelector(state => state.endUser.userEndUserData);
  useEffect(() => {
  }, []);

  const [email, setEmail] = useState(EndUser.email);
  const [first_name, setFirst_name] = useState(EndUser.end_user_profile.first_name);
  const [last_name, setLast_name] = useState(EndUser.end_user_profile.last_name);
  const [city, setCity] = useState(EndUser.end_user_profile.city);
  const [street, setStreet] = useState(EndUser.end_user_profile.street);
  const [zip, setZip] = useState(EndUser.end_user_profile.zip);
  const [avatar, setAvatar] = useState(EndUser.end_user_profile.avatar || null); 
 

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { getUser } = useGetMeEndUser();

    const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('city', city);
    formData.append('street', street);
    formData.append('zip', zip);
    if (avatar) {
      formData.append('avatar', avatar); // Only append avatar if a file is selected
    }

    try {
      await UpdateMeUser(formData);
      getUser();
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        setSuccess(false); // Hide the success message
        // window.location.reload(); // Reload the page
      }, 1000); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputFocus = () => {
    setSuccess(false); // Clear success message when any input field gains focus
  };

  return (
    <div className="pt-[5%] md:pt-0">
    <section className="py-10 bg-base-100/20">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center">
          <div>
          {success && (<div className="success-overlay">
                <div className="text-center p-10 bg-base-100/70 rounded-lg">
                <FontAwesomeIcon icon={faCheck} className="text-8xl text-secondary"/>
                    <h2 className="mt-8 mb-6">Profile succesfully updated</h2>
                </div>
                </div>)}
          {error && <small>{String(error)}</small>}
            <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2">Profile</h1>
            <h2 className="text-sm mb-4">Create/Update YourProfile</h2>
            <form onSubmit={handleSubmit}>
              <div className="w-full rounded-sm  bg-cover bg-center bg-no-repeat items-center">
              <div
  className="mx-auto flex justify-center w-[141px] h-[141px] bg-base-100/20 rounded-full"
  style={{
    backgroundImage: `url('${avatar ? avatar : defaultavatar}')`, // Check if avatar is provided, if not use default
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}

>

                  <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4 ">
                    <input type="file" name="profile" id="upload_profile" onChange={(e) => setAvatar(e.target.files[0])}
                  onFocus={handleInputFocus}
                  accept="image/*" hidden />
                    <label htmlFor="upload_profile">
                    <FontAwesomeIcon icon={faCamera} className='cursor-pointer text-secondary' />
                    </label>
                  </div>
                </div>
              </div>
              {/* <div className="flex justify-end"> */}
                {/* <input type="file" name="profile" id="upload_cover" hidden required />
                <div className="bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                  <label htmlFor="upload_cover" className="inline-flex items-center gap-1 cursor-pointer">
                    Cover
                    <svg data-slot="icon" className="w-6 h-5 text-blue-700" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"></path>
                    </svg>
                  </label>
                </div> */}
              {/* </div> */}
              {/* <h2 className="text-center mt-1 font-semibold ">Upload Avatar</h2> */}
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full  mb-4 lg:mt-6">
                  <label htmlFor="" className="mb-2">Email</label>
                  <input
                   type="email"
                   value={email}
                   readOnly
                   onFocus={handleInputFocus}
                   className="mt-2 p-4 w-full bg-base-100/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary
                     "
                     />
                </div>
                <div className="w-full  mb-4 lg:mt-6">
                  <label htmlFor="" className="">First Name</label>
                  <input
                  name="first_name"
                  id="first_name"
                  type="text"
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value )}
                  onFocus={handleInputFocus}
                  required
                  className="mt-2 p-4 w-full bg-base-100/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary
                    " 
                  />
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
              <div className="w-full  mb-4 lg:mt-6">
                  <label htmlFor="" className=" ">Last Name</label>
                  <input
                  name="last_name"
                  id="last_name"
                  type="text"
                  value={last_name}
                  onChange={(e) => setLast_name(e.target.value )}
                  onFocus={handleInputFocus}
                  required
                  className="mt-2 p-4 w-full bg-base-100/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary
                    " 
                  />
                </div>
                <div className="w-full  mb-4 lg:mt-6">
                  <label htmlFor="" className=" ">Adress</label>
                  <input
                name="address"
                id="street"
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value )}
                onFocus={handleInputFocus}
                  required
                  className="mt-2 p-4 w-full bg-base-100/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary
                    " 
                  />
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
              <div className="w-full  mb-4 lg:mt-6">
                  <label htmlFor="" className=" ">City</label>
                  <input
                 name="city"
                 id="city"
                 type="text"
                 value={city}
                 onChange={(e) => setCity( e.target.value)}
                 onFocus={handleInputFocus}
                  required
                  className="mt-2 p-4 w-full bg-base-100/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary
                    " 
                  />
                </div>
                <div className="w-full  mb-4 lg:mt-6">
                  <label htmlFor="" className=" ">Postal Code</label>
                  <input
                 name="postalCode"
                 id="zip"
                 type="text"
                 value={zip}
                 onChange={(e) => setZip(e.target.value)}
                 onFocus={handleInputFocus}
                  required
                  className="mt-2 p-4 w-full bg-base-100/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary
                    " 
                  />
                </div>

              </div>
              
                <Button type="submit" className="p-4">Submit</Button>
              
            </form>
          </div>
        </div>
      </div>
      
    </section>
    </div>
  );
};

export default Profile;