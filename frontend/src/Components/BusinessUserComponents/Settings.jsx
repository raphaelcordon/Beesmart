import Button from "../SmallComponents/Button.jsx";
import { useState, useEffect } from "react";
import { UpdateMeUser} from "../../axios/axiosCustomer.js";
import { useSelector } from 'react-redux';





const Settings = () => {
 
  const CustomerUser = useSelector(state => state.customer.userCustomerData);
  useEffect(() => {
   
  }, []);

  const [business_name, setBusinessName] = useState(CustomerUser.customer_user_profile.business_name);
  const [country, setCountry] = useState(CustomerUser.customer_user_profile.country);
  const [city, setCity] = useState(CustomerUser.customer_user_profile.city);
  const [street, setStreet] = useState(CustomerUser.customer_user_profile.street);
  const [zip, setZip] = useState(CustomerUser.customer_user_profile.zip);
  const [website, setWebsite] = useState(CustomerUser.customer_user_profile.website);
  const [logo, setLogo] = useState(CustomerUser.customer_user_profile.logo);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  

 const user = {
    business_name: business_name,
    country: country,
    city: city,
    street: street,
    zip: zip,
    website: website,
    //logo: logo, 
 }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UpdateMeUser(user); 
      //console.log('Profile updated successfully');
      setSuccess(true);
      setError(null);   
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputFocus = () => {
    setSuccess(false); // Clear success message when any input field gains focus
  };

  return (

    <div className="flex items-center justify-center">
      <div className="flex xl:items-center l:items-center justify-center sm:mt-p md:mt-50p">
        <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg mb-16">
          <h1 className="text-2xl font-semibold text-center mt-8 mb-6">Update Profile</h1>
          <form className="mb-10" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
               <div className="mb-2">
                <label className="block mb-2 text-sm text-accent-content">Email</label>
                <input
                  type="text"
                  value={CustomerUser.email} 
                  onFocus={handleInputFocus}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  
                />
              </div> 
              <div className="mb-2">
                <label className="block mb-2 text-sm text-accent-content">Address</label>
                <input
                  name="address"
                  id="street"
                  type="text"
                  value={street} 
                  onChange={(e) => setStreet(e.target.value )}
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm text-accent-content">City</label>
                <input
                  name="city"
                  id="city"
                  type="text"
                  value={city} 
                  onChange={(e) => setCity( e.target.value)}
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm text-accent-content">Postal Code</label>
                <input
                  name="postalCode"
                  id="zip"
                  type="text"
                  value={zip} 
                  onChange={(e) => setZip(e.target.value)}
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm text-accent-content">Country</label>
                <input
                  name="country"
                  id="country"
                  type="text"
                  value={country} 
                  onChange={(e) => setCountry( e.target.value)}
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm text-accent-content">Business Name</label>
                <input
                  name="business_name"
                  id="business_name"
                  type="text"
                  value={business_name} 
                  onChange={(e) => setBusinessName(e.target.value)}
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm text-accent-content">Website</label>
                <input
                  name="website"
                  id="website"
                  type="text"
                 // value={user.website} 
                 value={website}
                 placeholder="http://"
                  onChange={(e) => setWebsite(e.target.value)}
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                /><div>should start with http://</div>
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm text-accent-content">Upload Logo</label>
                <input
                  name="logo"
                  id="logo"
                  type="file"
                  
                  value={logo} 
                  onChange={(e) => setLogo(e.target.value)}
                  onFocus={handleInputFocus}
                  className="file-input file-input-secondary text-sm w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>
            <Button type="submit">Save</Button>
          </form>
          {success && <div className="text-success mb-4">Profile updated successfully!</div>}
          {error && <small>{String(error)}</small>}
        </div>
      </div>
      {console.log(CustomerUser)}
    </div>
    
  );
};

export default Settings;