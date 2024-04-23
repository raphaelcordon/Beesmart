import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";


const Home = () => {
  return (
    <section className="">
      <div className="container max-w-xl p-6 mx-auto space-y-12 lg:px-8 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl font-bold text-center sm:text-5xl">New Features</h2>
          <p className="max-w-3xl mx-auto mt-4 text-xl text-center">Explore the latest features that enhance your learning experience and make it even more exciting.</p>
        </div>
        <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mt-4 space-y-12">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md">
                  <FontAwesomeIcon icon={faQrcode} className="text-2xl"/> 
                  {/* original width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rocket"> */}
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                    
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leadi">Advanced Learning Algorithms</h4>
                  <p className="mt-2">Discover our improved learning algorithms that adapt to your preferences and provide even more personalized learning suggestions.</p>
                </div>
              </div>
              {/* Repeat other feature items similarly */}
            </div>
          </div>
          <div aria-hidden="true" className="mt-10 lg:mt-0">
            <img width="600" height="600" src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080" className="mx-auto rounded-lg shadow-lg dark-bg-gray-500" alt="Feature" style={{ color: "transparent" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
