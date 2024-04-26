import React from 'react';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UpdateMeUser } from "../../axios/axiosEndUser.js";
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
    if (avatar !== null) { // Check if avatar is not null before appending to formData
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

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]); // Update avatar state with the selected file
  };

  return (
    <div className="pt-[5%] md:pt-0">
      <section className="py-10 bg-base-100/50">
        <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
          <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto bg-base-100 shadow-2xl p-4 rounded-xl h-fit self-center">
            <div>
              {success && (
                <div className="success-overlay">
                  <div className="text-center p-10 bg-base-100/70 rounded-lg">
                    <FontAwesomeIcon icon={faCheck} className="text-8xl text-secondary"/>
                    <h2 className="mt-8 mb-6">Profile succesfully updated</h2>
                  </div>
                </div>
              )}
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
                      <input type="file" name="profile" id="upload_profile" onChange={handleAvatarChange}
                        onFocus={handleInputFocus}
                        accept="image/*" hidden />
                      <label htmlFor="upload_profile">
                        <FontAwesomeIcon icon={faCamera} className='cursor-pointer text-secondary' />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex text-left flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full mt-6">
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6">
                    <label htmlFor="" className="mb-2 pl-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      readOnly
                      onFocus={handleInputFocus}
                      className="mt-2 p-4 w-full bg-secondary/10  rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6">
                    <label htmlFor="" className="mb-2 pl-2">First Name</label>
                    <input
                      name="first_name"
                      id="first_name"
                      type="text"
                      value={first_name}
                      onChange={(e) => setFirst_name(e.target.value )}
                      onFocus={handleInputFocus}
                      required
                      className="mt-2 p-4 w-full bg-secondary/10  rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" 
                    />
                  </div>
                </div>
                <div className="flex text-left flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6">
                    <label htmlFor="" className="mb-2 pl-2 ">Last Name</label>
                    <input
                      name="last_name"
                      id="last_name"
                      type="text"
                      value={last_name}
                      onChange={(e) => setLast_name(e.target.value )}
                      onFocus={handleInputFocus}
                      required
                      className="mt-2 p-4 w-full bg-secondary/10  rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" 
                    />
                  </div>
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6">
                    <label htmlFor="" className="mb-2 pl-2 ">Adress</label>
                    <input
                      name="address"
                      id="street"
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value )}
                      onFocus={handleInputFocus}
                      required
                      className="mt-2 p-4 w-full bg-secondary/10  rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" 
                    />
                  </div>
                </div>
                <div className="flex text-left flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6">
                    <label htmlFor="" className="mb-2 pl-2 ">City</label>
                    <input
                      name="city"
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity( e.target.value)}
                      onFocus={handleInputFocus}
                      required
                      className="mt-2 p-4 w-full bg-secondary/10  rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" 
                    />
                  </div>
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6">
                    <label htmlFor="" className="mb-2 pl-2 ">Postal Code</label>
                    <input
                      name="postalCode"
                      id="zip"
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      onFocus={handleInputFocus}
                      required
                      className="mt-2 p-4 w-full bg-secondary/10  rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" 
                    />
                  </div>
                </div>

                <Button type="submit" className="m-6">Submit</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
