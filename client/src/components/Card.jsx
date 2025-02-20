import { NavLink } from "react-router";

const Card = ({ card, addToCart }) => {
    const { name, images } = card;


    return (<>
        <div>
            <p>{name}</p>
            <NavLink to={"/pokemon/" + card.id} >
                <img src={images.small} alt="img" />
            </NavLink>
        </div>
        <button onClick={() => addToCart(name)}>Add card to cart</button>
    </>
    )
}

export default Card;