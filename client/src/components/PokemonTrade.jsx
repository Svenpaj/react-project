import { useState } from "react";
import data from "../../public/data.js";
import Card from "./Card";

const PokemonTrade = () => {
    const cards = data;

    const [cart, setCart] = useState([]);

    function addToCart(name) {
        if (!cart.find(item => item.name == name)) {
            setCart([...cart, { "name": name, "amount": 1 }])
        }
        else {
            const tempCart = [...cart]
            const index = tempCart.findIndex(item => item.name == name)
            tempCart[index].amount += 1
            setCart(tempCart)
        }
    }


    return (
        <div>
            <h1>PTC SHOP</h1>
            <div>
                <section>
                    {
                        cart.length == 0 ? <p>Cart is empty</p> : cart.map((item, index) => <p key={item + "-" + index}>{item.name}, {item.amount}</p>)
                    }
                </section>
                <section style={{ display: "block", gap: "10px", columns: 3 }}>
                    {
                        cards.map((card) => <Card key={card.id}
                            card={card}
                            addToCart={addToCart}
                        />
                        )
                    }
                </section>
            </div>
        </div>
    )
}

export default PokemonTrade;