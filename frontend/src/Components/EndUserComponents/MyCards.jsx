import {useState} from "react";
import MyCardsOngoing from "./MyCardsComponents/MyCardsOngoing.jsx";
import MyCardsClosed from "./MyCardsComponents/MyCardsClosed.jsx";

const MyCards = () => {

    const [currentCards, setCurrentCards] = useState('ongoing');

    const handleToggleCards = (e, cardsOption) => {
        e.preventDefault();
        cardsOption === 'ongoing' ? setCurrentCards('ongoing') : setCurrentCards('closed');
    }

    return (
        <>
            <header className="container mx-auto flex flex-row gap-4 justify-center items-center">
                <span>
                    <a href="#" onClick={(e) => {
                    handleToggleCards(e, 'ongoing')}}>Ongoing</a>
                </span>
                <span>
                    <a href="#" onClick={(e) => {
                    handleToggleCards(e, 'closed') }}>Closed</a>
                </span>
            </header>

            <main>
                {currentCards === 'ongoing' && (
                    <MyCardsOngoing />
                )}

                {currentCards === 'closed' && (
                    <MyCardsClosed />
                )}
            </main>
        </>
    )
}

export default MyCards;