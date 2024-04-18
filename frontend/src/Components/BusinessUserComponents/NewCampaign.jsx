import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {RegisterNewCampaign} from "../../axios/axiosCampaign.js";
import Button from "../SmallComponents/Button.jsx";
import {useSelector} from "react-redux";

const NewCampaign = () => {

    const [name, setName] = useState('');
    const [value_goal, setValue_goal] = useState('');
    const [beginning_date, setBeginning_date] = useState('');
    const [ending_date, setEnding_date] = useState('');
    const [image, setImage] = useState('');
    const [logo, setLogo] = useState('');
    const [style, setStyle] = useState(0);
    const [customer_user_profile, setCustomer_user_profile] = useState('');

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const user = useSelector(state => state.customer.userCustomerData);

    useEffect(() => {
    if (user) {
        setCustomer_user_profile(user);
    }
}, [user]);

    const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
};

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const getSubmitData = async () => {
        setError('');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('value_goal', value_goal);
        if (beginning_date) formData.append('beginning_date', beginning_date);
        if (ending_date) formData.append('ending_date', ending_date);
        if (image) formData.append('image', image);
        if (logo) formData.append('logo', logo);
        if (style) formData.append('style', style);
        if (customer_user_profile) formData.append('customer_user_profile', customer_user_profile.id); // Assuming you need to send the ID

        try {
            await RegisterNewCampaign(formData);
            navigate("/business");
        } catch (error) {
            setError(error.message || 'Failed to register. Please try again.');
        }
    }

    return (
    <div className="flex items-center justify-center">
      <div className="flex xl:items-center l:items-center justify-center sm:mt-p md:mt-50p">
        <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg mb-16">
          <h1 className="text-2xl font-semibold text-center mt-8 mb-6">Verification</h1>
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
                        className="file-input file-input-secondary text-sm px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                  </div>

                  <div className="mb-10">
                      <label className="block mb-2 text-sm text-accent-content">Upload Campaign Image</label>
                      <input
                        name="image"
                        id="image"
                        type="file"
                        onChange={handleImageChange}
                        className="file-input file-input-secondary text-sm px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                  </div>
              </div>

            <Button> Create Campaign </Button>
          </form>
          {error && <small>{String(error)}</small>}
        </div>
      </div>
    </div>
  );
};

export default NewCampaign;