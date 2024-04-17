import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-40 md:mt-0">
      <h1 className="mb-4 text-6xl font-semibold text-error">404</h1>
      <p className="mb-4 text-lg text-accent-content">Oops! Looks like you're lost.</p>
      <div className="animate-bounce">
        <svg className="mx-auto h-16 w-16 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
      <p className="mt-4 text-base-content">
        Let's get you back{" "}
        <Link to="/" class="text-info">
          home
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFound;
