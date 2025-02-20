import { useState } from "react"

const CardGenerator = () => {
    const [text, setText] = useState('');
    const [color, setColor] = useState('#ffffff');
    const [cards, setCards] = useState([]);

    const handleGenerateCard = () => {
        setCards([...cards, { text, color }])
        setText('')
    };

    const handleClearCards = () => {
        setCards([])
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h3>Kortgenerator</h3>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Skriv text till kortet"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{
                        padding: '10px',
                        marginRight: '10px',
                        width: '200px',
                    }}
                />
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    style={{
                        padding: '5px',
                        width: '50px',
                        height: '40px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                />
                <button
                    onClick={handleGenerateCard}
                    style={{
                        padding: '10px 20px',
                        marginLeft: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Generera Kort
                </button>
                <button
                    onClick={handleClearCards}
                    style={{
                        padding: '10px 20px',
                        marginLeft: '10px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Rensa Alla Kort
                </button>
            </div>
            <div style={{ margin: '20px' }}>
                {cards.map((card, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: card.color,
                            color: '#000',
                            padding: '20px',
                            borderRadius: '10px',
                            width: '300px',
                            margin: '10px auto',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h3>{card.text}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardGenerator;