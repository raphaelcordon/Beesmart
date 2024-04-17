import {useState} from "react";
import MyCampaignInProgress from "./MyCampaignComponents/MyCampaignInProgress.jsx";
import MyCampaignFinished from "./MyCampaignComponents/MyCampaignFinished.jsx";

const MyCampaigns = () => {

    const [currentCampaign, setCurrentCampaign] = useState('inProgress');

    const handleToggleCampaings = (e, campaignOption) => {
        e.preventDefault();
        campaignOption === 'inProgress' ? setCurrentCampaign('inProgress') : setCurrentCampaign('finished');
    }

    return (
        <>
            <header className="container mx-auto flex flex-row gap-4 justify-center items-center">
                <span>
                    <a href="#" onClick={(e) => {
                    handleToggleCampaings(e, 'inProgress')}}>In progress</a>
                </span>
                <span>
                    <a href="#" onClick={(e) => {
                    handleToggleCampaings(e, 'finished') }}>Finished</a>
                </span>
            </header>

            <main>
                {currentCampaign === 'inProgress' && (
                    <MyCampaignInProgress />
                )}

                {currentCampaign === 'finished' && (
                    <MyCampaignFinished />
                )}
            </main>
        </>
    )
}

export default MyCampaigns;