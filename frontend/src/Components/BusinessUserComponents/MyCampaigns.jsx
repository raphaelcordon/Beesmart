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

    // const handleCreateNewCampaign = (e) => {
    //     e.preventDefault();
    //     setCreateNewCampaign(!createNewCampaign);
    // };

    console.log(campaignsOpen)
    console.log(campaignsClosed)

    return (
        <>
            {!createNewCampaign ? (
                <>
                    <header className=" mx-auto flex flex-row  justify-center items-center">
                
                <span className="mt-8 ">
                <a href="#" className="`cursor-pointer flex flex-col items-center pl-15 hover:font-bold  mx-2 my-2 md:mx-10 lg:mx-8 lg:my-0 xl:mx-12 ${active ?
         'text-secondary' : ''}`" onClick={(e) => {
                        handleToggleCampaigns(e, 'ongoing')
                    }}><FontAwesomeIcon icon={faPersonRunning} />Ongoing</a>
                </span>
                        <span className="mt-8">
                    <a href="#" className="`cursor-pointer flex flex-col items-center pl-15 hover:font-bold  mx-2 my-2 md:mx-10 lg:mx-8 lg:my-0 xl:mx-12 ${active ?
         'text-secondary' : ''}`" onClick={(e) => {
                        handleToggleCampaigns(e, 'closed')
                    }}><FontAwesomeIcon icon={faLock} />Closed</a>
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

                    <main className="flex flex-col items-center justify-center text-center">
                        {currentCampaigns === 'ongoing' ? (
                            <MyCampaignsOngoing list={campaignsOpen}/>
                        ) : (
                            <MyCampaignsClosed list={campaignsClosed}/>
                        )}

                        {isLoading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        <div></div>
                    </main>
                    
                </>
            ) : (
                <div>
                    <NewCampaign/>
                </div>
                
                
            )}
        </>
    )
}

export default MyCampaigns;