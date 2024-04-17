import Button from "../../Components/SmallComponents/Button";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center h-full">
        <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg">
          {/* <div className="flex justify-center mb-8">
        <img src="logo" alt="Logo" className="w-30 h-20"/>
      </div> */}
          <h1 className="text-2xl font-semibold text-center mt-8 mb-6">Log In</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm text-accent-content">
                E-mail
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
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
            <Button>Login</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
