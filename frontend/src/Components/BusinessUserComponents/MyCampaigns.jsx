import {useEffect, useState} from "react";
import MyCampaignsOngoing from "../CampaignComponents/CampaignsOngoing.jsx";
import MyCampaignsClosed from "../CampaignComponents/CampaignsClosed.jsx";
import {useParams} from "react-router-dom";
import {getAllClosedCampaigns, getAllOpenCampaigns} from "../../axios/axiosCampaign.js";
import NewCampaign from "./NewCampaign.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPersonRunning } from "@fortawesome/free-solid-svg-icons";


const MyCampaigns = () => {

    const [campaignsOpen, setCampaignsOpen] = useState([])
    const [campaignsClosed, setCampaignsClosed] = useState([])
    const [currentCampaigns, setCurrentCampaigns] = useState('ongoing');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [createNewCampaign, setCreateNewCampaign] = useState(false)
    
    useEffect(() => {
        window.scrollTo(0, 0);
        }, []);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setIsLoading(true);
            try {
                const data = await getAllOpenCampaigns();
                setCampaignsOpen(data);
            } catch (error) {
                setError(error.message || "Failed to load campaigns. Please try again.");
            } finally {
                setIsLoading(false);
            }
            setIsLoading(true);
            try {
                const data = await getAllClosedCampaigns();
                setCampaignsClosed(data);
            } catch (error) {
                setError(error.message || "Failed to load campaigns. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleToggleCampaigns = (e, campaignsOption) => {
        e.preventDefault();
        setCurrentCampaigns(campaignsOption);
        setCreateNewCampaign(false);
    };

    return (
        <>
        <div className="md:pt-0">
      <section className="py-10 bg-transparent md:bg-base-100/50">
        
          <div className="lg:w-[88%] md:w-[80%] xs:w-[100%] mx-auto bg-tsansparent  h-fit self-center">
            {!createNewCampaign ? (
                <>
                    <header className="mx-auto flex flex-row  justify-center items-center">
                
                <span className="">
                <a href="#" className="`cursor-pointer flex flex-col items-center pl-15 hover:font-bold  mx-2 my-2 md:mx-10 lg:mx-8 lg:my-0 xl:mx-12 ${active ?
         'text-secondary' : ''}`" onClick={(e) => {
                        handleToggleCampaigns(e, 'ongoing')
                    }}><FontAwesomeIcon icon={faPersonRunning} className="py-3" />Ongoing</a>
                </span>
                        <span className="">
                    <a href="#" className="`cursor-pointer flex flex-col items-center pl-15 hover:font-bold  mx-2 my-2 md:mx-10 lg:mx-8 lg:my-0 xl:mx-12 ${active ?
         'text-secondary' : ''}`" onClick={(e) => {
                        handleToggleCampaigns(e, 'closed')
                    }}><FontAwesomeIcon icon={faLock} className="p-3" />Closed</a>
                </span>

                        {/* New Campaign Button */}
                        {/* <button
                            className="p-2 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center h-12 w-12"
                            onClick={(e) => {
                                handleCreateNewCampaign(e, 'ongoing')
                            }}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 4v16m8-8H4"></path>
                            </svg>
                            
                        </button> */}
                    </header>

                    <main className="flex flex-row items-center justify-center text-center ">
                        {currentCampaigns === 'ongoing' ? (
                            <MyCampaignsOngoing isLoading={isLoading} list={campaignsOpen}/>
                        ) : (
                            <MyCampaignsClosed isLoading={isLoading} list={campaignsClosed}/>
                        )}

                        {error && <p>Error: {error}</p>}
                        <div></div>
                    </main>
                    
                </>
            ) : (
                <div>
                    <NewCampaign/>
                </div>
            )}
            {/* </div> */}
        </div>
        </section>
        </div>
        </>
    )
}

export default MyCampaigns;