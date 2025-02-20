import { useEffect, useState } from "react";
import { useParams } from "react-router";
import data from "../../public/data";

function CardInfo() {
    const [card, setCard] = useState();
    const { cardId } = useParams();

    useEffect(() => {
        const cardData = data.find(card => card.id == cardId)
        setCard(cardData);
    }, [cardId])


    return (
        !card ?
            <p>No card was found!</p>
            :
            <section id="cardInfo">
                <h1>{card.name}</h1>
                <img src={card.images.large} alt={card.name} />
                <h3>{card.flavorText}</h3>
            </section>
    )
}

export default CardInfo;