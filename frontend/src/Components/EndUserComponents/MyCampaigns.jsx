import {useEffect, useState} from "react";
import MyCampaignsOngoing from "./MyCampaignsComponents/MyCampaignsOngoing.jsx";
import MyCampaignsClosed from "./MyCampaignsComponents/MyCampaignsClosed.jsx";
import {useParams} from "react-router-dom";
import {getCampaignByEndUser} from "../../axios/axiosCampaign.js";

const MyCampaigns = () => {

    let { id } = useParams();
    const [campaigns, setCampaigns] = useState([])
    const [currentCampaigns, setCurrentCampaigns] = useState('ongoing');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setIsLoading(true);
            try {
                const data = await getCampaignByEndUser(id);
                setCampaigns(data); // Assuming getCampaignByEndUser returns the campaign data
            } catch (error) {
                setError(error.message || "Failed to load campaigns. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleToggleCampaigns = (e, campaignsOption) => {
        e.preventDefault();
        campaignsOption === 'ongoing' ? setCurrentCampaigns('ongoing') : setCurrentCampaigns('closed');
    }

    return (
        <>
            <header className="container mx-auto flex flex-row gap-4 justify-center items-center">
                <span>
                    <a href="#" onClick={(e) => {
                    handleToggleCampaigns(e, 'ongoing')}}>Ongoing</a>
                </span>
                <span>
                    <a href="#" onClick={(e) => {
                    handleToggleCampaigns(e, 'closed') }}>Closed</a>
                </span>
            </header>

            <main>
                {currentCampaigns === 'ongoing' && (
                    <MyCampaignsOngoing list={campaigns}/>
                )}

                {currentCampaigns === 'closed' && (
                    <MyCampaignsClosed />
                )}


                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
            </main>
        </>
    )
}

export default MyCampaigns;