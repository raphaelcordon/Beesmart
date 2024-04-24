import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { UpdateMeUser } from "../../axios/axiosCustomer.js";
import Button from "../SmallComponents/Button.jsx";

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
  const [logo, setLogo] = useState(null); // Initialize logo state to null

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('business_name', business_name);
    formData.append('country', country);
    formData.append('city', city);
    formData.append('street', street);
    formData.append('zip', zip);
    formData.append('website', website);
    if (logo) {
      formData.append('logo', logo); // Only append logo if a file is selected
    }

    try {
      await UpdateMeUser(formData); 
      setSuccess(true);
      setError(null);   
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputFocus = () => {
    setSuccess(false); // Clear success message when any input field gains focus
  };

  return (

    <div className="flex flex-col items-center justify-center text-center mb-10 ">
    <div className="">
        <div className=" mt-20 w-full bg-base-100/50 rounded-lg shadow-lg">
          <div className="p-8">
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
                  onChange={(e) => setWebsite(e.target.value)}
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm text-accent-content">Upload Logo</label>
                <input
                  name="logo"
                  id="logo"
                  type="file"
                  onChange={(e) => setLogo(e.target.files[0])} 
                  onFocus={handleInputFocus}
                  accept="image/*"
                  className="file-input file-input-secondary text-sm w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>
            <Button className="mt-8" type="submit">Save</Button>
          
          {success && <div className="text-success">Profile updated successfully!</div>}
          {error && <small>{String(error)}</small>}
          </form>
        </div>
        </div>
      </div>
      {console.log(CustomerUser)}
    </div>
    
  );
};

export default Settings;