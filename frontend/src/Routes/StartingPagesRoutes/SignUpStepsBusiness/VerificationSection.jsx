import Button from "../../../Components/SmallComponents/Button";

const VerificationSection = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex xl:items-center l:items-center justify-center sm:mt-p md:mt-50p">
          <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg mb-16">
            <div>
              <h1 className="text-2xl font-semibold text-center mt-8 mb-6">Verification</h1>
            </div>
            <form className="mb-10">
              <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">First Name</label>
                  <input
                    name="name"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /* placeholder="Enter name" */
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">Last Name</label>
                  <input
                    name="lname"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /* placeholder="Enter last name" */
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /* placeholder="Enter email" */
                    /* value={email} */
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">Verification Code</label>
                  <input
                    name="verification Code"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /* placeholder="Enter your verification code" */
                    /* value={code} */
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">Adress</label>
                  <input
                    name="adress"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /* placeholder="Enter mobile number" */
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">City</label>
                  <input
                    name="city"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /* placeholder="Enter City" */
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">Postal Code</label>
                  <input
                    name="postalcode"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /* placeholder="Enter Postal Code" */
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">Country</label>
                  <input
                    name="country"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /* placeholder="Enter Country" */
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /*   placeholder="Enter password" */
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm text-accent-content">Confirm Password</label>
                  <input
                    name="cpassword"
                    type="password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /* placeholder="Enter confirm password" */
                    required
                  />
                </div>
                <div className="mb-10">
                  <label className="block mb-2 text-sm text-accent-content">Upload Logo</label>
                  <input
                    name="logo"
                    type="file"
                    className="file-input file-input-secondary text-sm w-full sm:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    /*   placeholder="Enter password" */
                  />
                </div>
              </div>
            </form>
            <div className="mt-8 mb-6">
              <ul className="steps">
                <li className="step step-secondary"></li>
                <li className="step step-secondary"></li>
                <li className="step step-secondary"></li>
              </ul>
            </div>

            <Button>Continue</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerificationSection;

