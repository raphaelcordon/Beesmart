import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { UpdateMeUser } from "../../axios/axiosEndUser.js";
import Button from "../SmallComponents/Button.jsx";
import useGetMeEndUser from "../../Hooks/useGetMeEndUser.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCheck } from "@fortawesome/free-solid-svg-icons";
import defaultavatar from "../../assets/avatar_default.png"


const Profile = () => {
  const EndUser = useSelector(state => state.endUser.userEndUserData);
  const { getUser } = useGetMeEndUser();

  useEffect(() => {
  }, []);
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState(EndUser.email);
  const [first_name, setFirst_name] = useState(EndUser.end_user_profile.first_name);
  const [last_name, setLast_name] = useState(EndUser.end_user_profile.last_name);
  const [city, setCity] = useState(EndUser.end_user_profile.city);
  const [street, setStreet] = useState(EndUser.end_user_profile.street);
  const [zip, setZip] = useState(EndUser.end_user_profile.zip);
  const [avatar, setAvatar] = useState(EndUser.end_user_profile.avatar || null); 

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmitProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('city', city);
    formData.append('street', street);
    formData.append('zip', zip);

    try {
      await UpdateMeUser(formData);
      getUser();
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        setSuccess(false);
      }, 1000); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmitAvatar = async (e) => {
    e.preventDefault();

    if (!avatar) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      await UpdateMeUser(formData);
      getUser();
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
        
      }, 1000); 
      
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputFocus = () => {
    setSuccess(false); // Clear success message when any input field gains focus
  };

  return (
    <div className="md:pt-0">
      <section className="py-10 bg-transparent md:bg-base-100/50">
        <div className="lg:w-[80%] md:w-[90%] xs:w-[80%] mx-10 md:mx-auto ">
          <div className="lg:w-[88%] md:w-[80%] xs:w-[100%] mx-auto bg-tsansparent md:bg-base-100  h-fit self-center">
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
              <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mt-2 mb-2">Profile</h1>
              <h2 className="text-sm mb-4">Create/Update Your Profile</h2>
              
              <div className="w-full rounded-sm bg-cover bg-center bg-no-repeat items-center">
                <div
                  className="mx-auto flex justify-center w-[141px] h-[141px] bg-base-100/20 rounded-full"
                  style={{
                    backgroundImage: `url('${avatar ? avatar : defaultavatar}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4 ">
                    <input 
                      type="file" 
                      name="profile" 
                      id="upload_profile" 
                      onChange={(e) => setAvatar(e.target.files[0])}
                      onFocus={handleInputFocus}
                      accept="image/*" 
                      hidden 
                    />
                    <label htmlFor="upload_profile">
                      <FontAwesomeIcon icon={faCamera} className='cursor-pointer text-secondary' />
                    </label>
                  </div>
                </div>
                <form onSubmit={handleSubmitAvatar}>
                <Button type="submit" className="px-6 mt-6">Save Avatar</Button>
              </form>
              </div>

              <form onSubmit={handleSubmitProfile}>
                <div className="flex text-left flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2  w-full mt-6">
                  <div className="w-full mb-4 lg:mb-0 md:mt-6 flex flex-col ">
                    <label htmlFor="email" className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Email</label>
                    <input
                      name="email"
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={handleInputFocus}
                      required
                      readOnly
                      className="w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5  border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                    />
                  </div>
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center ">
                    <label htmlFor="first_name" className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">First Name</label>
                    <input
                      name="first_name"
                      id="first_name"
                      type="text"
                      value={first_name}
                      onChange={(e) => setFirst_name(e.target.value )}
                      onFocus={handleInputFocus}
                      required
                      className="w-full md:w-3/4 mt-2 mb-2  ml-0 md:ml-5  border-b-2 border-secondary  focus:outline-none focus:border-primary bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex text-left flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center">
                    <label htmlFor="last_name" className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Last Name</label>
                    <input
                      name="last_name"
                      id="last_name"
                      type="text"
                      value={last_name}
                      onChange={(e) => setLast_name(e.target.value )}
                      onFocus={handleInputFocus}
                      required
                      className="w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5 border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                    />
                  </div>
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center">
                    <label htmlFor="street" className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Address</label>
                    <input
                      name="street"
                      id="street"
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value )}
                      onFocus={handleInputFocus}
                      required
                      className="w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5 border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex text-left flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center">
                    <label htmlFor="city" className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">City</label>
                    <input
                      name="city"
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity( e.target.value)}
                      onFocus={handleInputFocus}
                      required
                      className="w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5 border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                    />
                  </div>
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center">
                    <label htmlFor="zip" className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Postal Code</label>
                    <input
                      name="zip"
                      id="zip"
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      onFocus={handleInputFocus}
                      required
                      className="w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5 border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                    />
                  </div>
                </div>
<div className='flex justify-center md:justify-end lg:mr-[10%]'>
                <Button type="submit" className="m-0 md:m-6 mt-6"
                    disabled={isLoading}>
                    {isLoading ? 'Saving Profile...' : 'Save Profile'}</Button>
                </div>
              </form>

              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
