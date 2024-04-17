import Button from "../../Components/SmallComponents/Button";

const SignUpEndUser = () => {
  return (
    <>
      <div className="flex xl:items-center l:items-center justify-center sm:mt-50 md:mt-50">
        <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg">
          {/* <div className="flex justify-center mb-8">
        <img src="logo" alt="Logo" className="w-30 h-20"/>
      </div> */}
          <h2 className="mt-8 mb-6">
            🎉 Want to stay in the loop about all the exciting promotions you're a part of?{" "}
          </h2>
          <h1 className="text-2xl font-semibold text-center mt-8 mb-6">Join Us</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm text-accent-content">
                Enter Your E-mail
              </label>
              <input
                type="email"
                id="email"
                name="eimal"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm text-accent-content">
                Set Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmpassword" className="block mb-2 text-sm text-accent-content">
                Repeat Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>

            <Button> Register</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpEndUser;
