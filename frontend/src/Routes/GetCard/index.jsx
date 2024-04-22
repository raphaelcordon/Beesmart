import tick from "../../assets/check-mark-forcongratulationsection.png";
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import {GetEndUserVerify} from "../../axios/axiosEndUser.js";


const GetCard = () => {

    let { id } = useParams();
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
        const download = async () => {
          try {
            const data = await GetEndUserVerify(id);
            // Create a URL from the blob
            console.log(data)
            const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.apple.pkpass' }));
  
            // Create a temporary anchor tag to trigger download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'BeeSmart.pkpass'); // Set the desired pass file name here
            document.body.appendChild(link);
            link.click();
            setVerified(true)
          } catch (error) {
              setError(error.message || 'Failed to register. Please try again.');
              setVerified(false)
          }
        }
        download()
    }, []);

    return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex xl:items-center l:items-center justify-center sm:mt-p md:mt-50p">
          <div className="max-w-md w-full p-6 bg-base-100 rounded-lg shadow-lg flex flex-col items-center">

              {verified && (
                  <div>
                      <img src={tick} className="w-16 sm:w-24 md:w-40 lg:w-40 xl:w-48" alt="Tick"/>
                      <h2 className="mt-8 mb-6">Your email was successfully verified.</h2>
                  </div>
                )
              }
              {!verified && (
                  <div>
                      {/*<img src={tick} className="w-16 sm:w-24 md:w-40 lg:w-40 xl:w-48" alt="Tick"/>*/}
                      <h2 className="mt-8 mb-6">Your email could not be verified.</h2>
                      {error && <small>{String(error)}</small>}
                  </div>
                )
              }

              <div className="mt-8 mb-6">
              </div>
          </div>
        </div>
      </div>
    </>
    );
};

export default GetCard;