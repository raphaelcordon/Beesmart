import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { UpdateMeUser } from "../../axios/axiosCustomer.js";
import Button from "../SmallComponents/Button.jsx";
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useGetMeUser from '../../Hooks/useGetMeUser.js';
import defaultavatar from "../../assets/avatar_default.png"


const Settings = () => {

  
  const CustomerUser = useSelector(state => state.customer.userCustomerData);
  useEffect(() => {
  }, []);

  const [isLoading, setIsLoading] = useState(false)
  const [business_name, setBusinessName] = useState(CustomerUser.customer_user_profile.business_name);
  const [country, setCountry] = useState(CustomerUser.customer_user_profile.country);
  const [city, setCity] = useState(CustomerUser.customer_user_profile.city);
  const [street, setStreet] = useState(CustomerUser.customer_user_profile.street);
  const [zip, setZip] = useState(CustomerUser.customer_user_profile.zip);
  const [website, setWebsite] = useState(CustomerUser.customer_user_profile.website);
  const [logo, setLogo] = useState(CustomerUser.customer_user_profile.logo || null); 

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { getUser } = useGetMeUser()
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('business_name', business_name);
    formData.append('country', country);
    formData.append('city', city);
    formData.append('street', street);
    formData.append('zip', zip);
    formData.append('website', website);
    // if (logo) {
    //   formData.append('logo', logo); // Only append logo if a file is selected
    // }

    try {
      await UpdateMeUser(formData); 
      getUser()
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

  const handleSubmitLogo = async (e) => {
    e.preventDefault();

    if (!logo) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('logo', logo);

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
        {/* <div className="lg:w-[80%] md:w-[90%] xs:w-[80%] mx-10 md:mx-auto "> */}
          <div className="lg:w-[88%] md:w-[80%] xs:w-[100%] mx-auto bg-tsansparent  h-fit self-center">
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
              <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mt-2 mb-2 pt-2 ">Settings</h1>
              <h2 className="text-sm mb-4">Update Your Profile</h2>
              
              <div className="w-full rounded-sm bg-cover bg-center bg-no-repeat items-center">
                <div
                  className="mx-auto flex justify-center w-[141px] h-[141px] bg-base-100/20 rounded-full"
                  style={{
                    backgroundImage: `url('${logo ? logo : defaultavatar}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <div className="bg-white/90 rounded-[50%] w-6 h-6 text-center ml-28 mt-4 ">
                    <input 
                      type="file" 
                      name="profile" 
                      id="upload_profile" 
                      onChange={(e) => setLogo(e.target.files[0])}
                      onFocus={handleInputFocus}
                      accept="image/*" 
                      hidden 
                    />
                    <label htmlFor="upload_profile">
                      <FontAwesomeIcon icon={faCamera} className='cursor-pointer text-secondary' />
                    </label>
                  </div>
                </div>
                <form onSubmit={handleSubmitLogo}>
                <Button type="submit" className="m-0 md:m-6 mt-6"
                    disabled={isLoading}>
                    {isLoading ? 'Saving Logo...' : 'Save Logo'}</Button>
              </form>
              </div>
              <div className="pl-[10%] pr-[10%] md:pr-0">
              <form onSubmit={handleSubmit}>
                <div className="flex text-left flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2  w-full mt-6">
                  <div className="w-full mb-4 lg:mb-0 md:mt-6 flex flex-col ">
                    <label htmlFor="email" className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Email<span className='text-error text-l font-semibold'>*</span></label>
                    <input
                      type="text"
                      value={CustomerUser.email} 
                      onFocus={handleInputFocus}
                      readOnly
                      className="w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5  border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                    />
                  </div>
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center">
                    <label htmlFor="street" className="required-label mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Country<span className='text-error text-l font-semibold'>*</span></label>
                    <input
                        name="country"
                        id="country"
                        type="text"
                        value={country} 
                        onChange={(e) => setCountry( e.target.value)}
                        onFocus={handleInputFocus}
                        required
                       
                      
                      className="w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5 border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                    />
                  </div>
                  
                </div>

                 <div className="flex text-left flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center">
                  <label htmlFor="street" className="required-label mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Address<span className='text-error text-l font-semibold'>*</span></label>
                    <input
                       name="address"
                       id="street"
                       type="text"
                       value={street} 
                       onChange={(e) => setStreet(e.target.value )}
                       onFocus={handleInputFocus}
                       required
                      
                      className="w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5 border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                    />
                  </div>
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center">
                  <label htmlFor="city" className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">City<span className='text-error text-l font-semibold'>*</span></label>
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
                </div>

                <div className="flex text-left flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center">
                  <label htmlFor="zip" className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Postal Code<span className='text-error text-l font-semibold'>*</span></label>
                    <input
                       name="postalCode"
                       id="zip"
                       type="text"
                       value={zip} 
                       onChange={(e) => setZip(e.target.value)}
                       onFocus={handleInputFocus}
                       required
                      
                      className="w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5 border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                    />
                  </div>
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center">
                  <label htmlFor="city" className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Business Name<span className='text-error text-l font-semibold'>*</span></label>
                    <input
                    name="business_name"
                    id="business_name"
                    type="text"
                    value={business_name} 
                    onChange={(e) => setBusinessName(e.target.value)}
                    onFocus={handleInputFocus}
                    required
                      
                      className="w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5 border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                    />
                  </div>
                </div>
                <div className="flex text-left flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center">
                  <label htmlFor="zip" className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Website</label>
                  <input
                       name="website"
                       id="website"
                       type="text"
                      // value={user.website} 
                      value={website}
                       onChange={(e) => setWebsite(e.target.value)}
                       onFocus={handleInputFocus}
                      
                      
                      className="w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5 border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                    />
                  </div>
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center">
                  <label htmlFor="zip" className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest"></label>
                    
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
        {/* </div> */}
      </section>
    </div>
  );
};

export default Settings;