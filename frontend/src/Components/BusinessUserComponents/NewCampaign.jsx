
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {RegisterNewCampaign} from "../../axios/axiosCampaign.js";
import Button from "../SmallComponents/Button.jsx";
import {useSelector} from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const NewCampaign = () => {

    const [name, setName] = useState('');
    const [value_goal, setValue_goal] = useState('');
    const [beginning_date, setBeginning_date] = useState('');
    const [ending_date, setEnding_date] = useState('');
    const [image, setImage] = useState('');
    const [logo, setLogo] = useState('');
    const [style, setStyle] = useState(0);
    const [customer_user_profile, setCustomer_user_profile] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Select an option'); // Default text or first option
    const [collector_type, setCollector_type] = useState('');

    const [isLoading, setIsLoading] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const user = useSelector(state => state.customer.userCustomerData);

    useEffect(() => {
    if (user) {
        setCustomer_user_profile(user);
    }
}, [user]);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelectOption = (value, label) => {
        setCollector_type(value);
        setSelectedOption(label);
        setIsOpen(false); // Close the dropdown after selection
    };

    const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
};

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const getSubmitData = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('value_goal', value_goal);
        formData.append('collector_type', collector_type);
        if (beginning_date) formData.append('beginning_date', beginning_date);
        if (ending_date) formData.append('ending_date', ending_date);
        if (image) formData.append('image', image);
        if (logo) formData.append('logo', logo);
        if (style) formData.append('style', style);
        if (customer_user_profile) formData.append('customer_user_profile', customer_user_profile.id); // Assuming you need to send the ID

        try {
            setIsLoading(true);
            await RegisterNewCampaign(formData);
            displaySuccessMessage()
        } catch (error) {
            console.log(error)
            setError(error.message || 'Failed to register. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    }

    const displaySuccessMessage = () => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate(`/business`);
      }, 3000);  // Hides the overlay after 3 seconds
    };

    return (
    <div className="flex items-center justify-center">
        {showSuccessMessage && (
            <div className="success-overlay">
                <div className="text-center p-10 bg-white rounded-lg">
                <FontAwesomeIcon icon={faCheck} className="text-8xl text-secondary"/>
                    <h2 className="mt-8 mb-6">A new campaign was successfully created</h2>
                </div>
            </div>
        )}
      <div className="flex xl:items-center l:items-center justify-center sm:mt-p md:mt-50p">
        <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg mb-16">
          <h2 className="text-2xl font-semibold text-center mt-8 mb-6">New Campaign Creation</h2>
          <form className="mb-10" onSubmit={getSubmitData}>
              <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
                  <div className="mb-2">
                      <label className="block mb-2 text-sm text-accent-content">Name</label>
                      <input
                          name="name"
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                          required
                      />
                  </div>
                  <div className="mb-2">
                      <label className="block mb-2 text-sm text-accent-content">Type of Campaign</label>
                      <div className="relative">
                          <button
                              type="button"
                              className="w-full px-8 py-2 text-left flex justify-around items-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-white text-gray-700"
                              onClick={toggleDropdown}
                          >
                              {selectedOption}
                              <svg className="w-6 h-4" fill="none" stroke="currentColor" style={{display: 'block'}}>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M19 9l-7 7-7-7"/>
                              </svg>
                          </button>
                          {isOpen && (
                              <div
                                  className="absolute w-full bg-white shadow-lg max-h-60 overflow-auto rounded-lg z-10">
                                  <div className="py-1" onClick={() => handleSelectOption('1', 'Stamps')}>Stamps</div>
                                  <div className="py-1" onClick={() => handleSelectOption('2', 'Points')}>Points</div>
                                  <div className="py-1" onClick={() => handleSelectOption('3', 'Money spent')}>Money spent</div>
                          </div>
                        )}
                      </div>
                  </div>
                  <div className="mb-2">
                      <label className="block mb-2 text-sm text-accent-content">Value Goal</label>
                      <input
                          name="value_goal"
                          id="value_goal"
                          type="text"
                          value={value_goal}
                          onChange={(e) => setValue_goal(e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                          required
                      />
                  </div>


                  <div className="mb-2">
                      <label className="block mb-2 text-sm text-accent-content">Beginning Date</label>
                      <input
                          name="beginning_date"
                          id={"beginning_date"}
                          type="date"
                          value={beginning_date}
                          onChange={(e) => setBeginning_date(e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                  </div>
                  <div className="mb-2">
                      <label className="block mb-2 text-sm text-accent-content">Ending Date</label>
                      <input
                          name="ending_date"
                          id={"ending_date"}
                          type="date"
                          value={ending_date}
                          onChange={(e) => setEnding_date(e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                  </div>

                  <div className="mb-10">
                      <label className="block mb-2 text-sm text-accent-content">Upload Logo</label>
                      <input
                        name="logo"
                        id="logo"
                        type="file"
                        onChange={handleLogoChange}
                        className="file-input file-input-secondary text-sm w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                  </div>

                  <div className="mb-10">
                      <label className="block mb-2 text-sm text-accent-content">Upload Campaign Image</label>
                      <input
                        name="image"
                        id="image"
                        type="file"
                        onChange={handleImageChange}
                        className="file-input file-input-secondary text-sm w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                  </div>
              </div>

            <Button disabled={isLoading || name === "" || collector_type === "" || value_goal === ""}>
            {isLoading ? 'Creating Campaign...' : 'Create Campaign'}</Button>
          </form>
          {error && <p className="text-error text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default NewCampaign;