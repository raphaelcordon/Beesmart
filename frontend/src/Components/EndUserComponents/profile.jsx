import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {UpdateMeUser} from "../../axios/axiosEndUser.js";
import Button from "../SmallComponents/Button.jsx";
import useGetMeEndUser from "../../Hooks/useGetMeEndUser.js";

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

    try {
      await UpdateMeUser(formData);
      getUser();
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
                  value={email}
                  onFocus={handleInputFocus}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"

                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm text-accent-content">First Name</label>
                <input
                  name="first_name"
                  id="first_name"
                  type="text"
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value )}
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm text-accent-content">Last Name</label>
                <input
                  name="last_name"
                  id="last_name"
                  type="text"
                  value={last_name}
                  onChange={(e) => setLast_name(e.target.value )}
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
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
                <label className="block mb-2 text-sm text-accent-content">Upload Avatar (not implemented)</label>
                <input
                  name="avatar"
                  id="avatar"
                  type="file"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  onFocus={handleInputFocus}
                  accept="image/*"
                  className="file-input file-input-secondary text-sm w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>
            <Button type="submit">Save</Button>
          </form>
          {success && <div className="text-success mb-4">Profile updated successfully!</div>}
          {error && <small>{String(error)}</small>}
        </div>
      </div>
      {console.log(EndUser)}
    </div>

  );
};

export default Profile;