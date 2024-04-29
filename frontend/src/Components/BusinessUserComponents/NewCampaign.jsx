import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterNewCampaign } from "../../axios/axiosCampaign.js";
import Button from "../SmallComponents/Button.jsx";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCheck } from "@fortawesome/free-solid-svg-icons";

// CSS rule for styling the calendar icon and file input
const SecondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary');
const styles = `
input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
  },

`;

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
    <div className="md:pt-0">
      <style>{styles}</style>
      <section className="py-10 bg-transparent md:bg-base-100/50">
        <div className="lg:w-[80%] md:w-[90%] xs:w-[80%] mx-10 md:mx-auto ">
          <div className="lg:w-[88%] md:w-[80%] xs:w-[100%] mx-auto bg-transparent md:bg-base-100 h-fit self-center">
            <div>
              {showSuccessMessage && (
                <div className="success-overlay">
                  <div className="text-center p-10 bg-base-100/70 rounded-lg">
                    <FontAwesomeIcon icon={faCheck} className="text-8xl text-secondary"/>
                    <h2 className="mt-8 mb-6">A new campaign was successfully created</h2>
                  </div>
                </div>
              )}
              {error && <small>{String(error)}</small>}
              <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mt-2 mb-2 pt-2">Create new Campaign</h1>
              <h2 className="text-sm mb-4"></h2>

              <form onSubmit={getSubmitData}>
                <div className="flex text-left flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2  w-full mt-6">
                  <div className="w-full mb-4 lg:mb-0 md:mt-6 flex flex-col ">
                    <label  className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Name<span className='text-error text-l font-semibold'>*</span></label>
                    <input
                      name="name"
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}

                      required

                      className="w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5  border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                    />
                  </div>
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center ">
                    <label  className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Type of Campaign<span className='text-error text-l font-semibold'>*</span></label>
                    <div className="relative cursor-pointer">
                      <button
                        type="button"
                        className="relative w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5 border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent text-left"
                        onClick={toggleDropdown}
                      >
                        <FontAwesomeIcon icon={faCaretDown} className="text-s pr-2 text-secondary absolute right-0 top-1/2 transform -translate-y-1/2"/>
                        {selectedOption}
                        {isOpen && (
                          <div className="absolute left-0 w-full bg-base-100/90 shadow-lg max-h-60 overflow-auto rounded-md z-10">
                            <div className="py-1 pl-4" onClick={() => handleSelectOption('1', 'Stamps')}>Stamps</div>
                            <div className="py-1 pl-4" onClick={() => handleSelectOption('2', 'Points')}>Points</div>
                            <div className="py-1 pl-4" onClick={() => handleSelectOption('3', 'Money spent')}>Money spent</div>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex text-left flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center">
                    <label  className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Value Goal<span className='text-error text-l font-semibold'>*</span></label>
                    <input
                      name="value_goal"
                      id="value_goal"
                      type="text"
                      value={value_goal}
                      onChange={(e) => setValue_goal(e.target.value)}

                      required
                      className="w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5 border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                    />
                    </div>
                    <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center">
                    <label htmlFor="beginning_date" className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Beginning Date</label>
                    
                    <input
                        name="beginning_date"
                        id="beginning_date"
                        type="date"
                        value={beginning_date}
                        onChange={(e) => setBeginning_date(e.target.value)}
                        className="w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5 border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                    />

                     </div>
                </div>

                <div className="flex text-left flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                    <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center">
                    <label  className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Ending Date</label>
                    <input
                      name="ending_date"
                      id={"ending_date"}
                      type="date"
                      value={ending_date}
                      onChange={(e) => setEnding_date(e.target.value)}

                      className="w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5 border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                    />
                    </div>
                     <div className="w-full mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center">
  
                    <div className="w-full  mb-4 lg:mb-0 md:mt-6 flex flex-col justify-center">
                    <label className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Upload Logo</label>
                    <input
                      name="logo"
                      id="logo"
                      type="file"
                      onChange={handleLogoChange}
                      className="file-input-m file-input-secondary w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5 border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                    />

                    </div>

                    </div>
                </div>
                <div className="flex text-left flex-col lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full md:w-[50%] ">
                    <div className="w-full mb-4 lg:mb-0 md:mt-6 flex-col justify-start">
                    <label  className="mb-2 ml-0 md:ml-5 text-xs uppercase tracking-widest">Upload Campaign Image</label>
                    <input
                      name="image"
                      id="image"
                      type="file"
                      onChange={handleImageChange}
                      className="file-input-m file-input-secondary w-full md:w-3/4 mt-2 mb-2 ml-0 md:ml-5 border-b-2 border-secondary focus:outline-none focus:border-primary bg-transparent"
                      />
                      </div>
                </div>
                    <div className='flex justify-center md:justify-end lg:mr-[10%]'>
                    <Button type="submit" className="m-0 md:m-6 mt-6"
                    disabled={isLoading || name === "" || collector_type === "" || value_goal === ""}>
                    {isLoading ? 'Creating Campaign...' : 'Create Campaign'}</Button>

                  {error && <p className="text-error text-sm mt-2">{error}</p>}
                </div>
              </form>


            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewCampaign;
