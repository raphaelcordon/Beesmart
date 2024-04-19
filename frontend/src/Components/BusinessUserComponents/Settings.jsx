import Button from "../SmallComponents/Button.jsx";
import { useState, useEffect } from "react";
import { UpdateMeUser, GetMeUser} from "../../axios/axiosCustomer.js";





const Settings = () => {
  const [user, setUser] = useState({
    business_name: "",
    country: "",
    city: "",
    street: "",
    zip: "",
    website: "",
    logo: "",
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    //function to get the userdata
    GetMeUser().then(userData => setUser(userData));
  }, []);

  

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
                  defaultValue={user.email} 
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
                  defaultValue={user.street} 
                  onChange={(e) => setUser({...user, street: e.target.value})}
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
                  defaultValue={user.city} 
                  onChange={(e) => setUser({...user, city: e.target.value})}
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
                  defaultValue={user.zip} 
                  onChange={(e) => setUser({...user, zip: e.target.value})}
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
                  defaultValue={user.country} 
                  onChange={(e) => setUser({...user, country: e.target.value})}
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
                  defaultValue={user.business_name} 
                  onChange={(e) => setUser({...user, business_name: e.target.value})}
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
                  defaultValue={user.website} 
                  onChange={(e) => setUser({...user, website: e.target.value})}
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
                  defaultValue={user.logo} 
                  onChange={(e) => setUser({...user, logo: e.target.value})}
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
    </div>
  );
};

export default Settings;