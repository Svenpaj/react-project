import { useState } from 'react';

const GuessingGame = ({ number }) => {
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const targetNumber = number;

    const handleInputChange = (event) => {
        setGuess(event.target.value);
    };

    const handleGuess = () => {
        const numericGuess = parseInt(guess, 10);

        if (isNaN(numericGuess)) {
            setMessage('Vänligen skriv in ett giltigt tal.');
        } else if (numericGuess < targetNumber) {
            setMessage('För lågt! Försök igen.');
        } else if (numericGuess > targetNumber) {
            setMessage('För högt! Försök igen.');
        } else {
            setMessage('Korrekt! Du gissade rätt.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center', alignItems: 'center' }}>
            <h3>Gissningsleken</h3>
            <p style={{ fontWeight: 'bold', fontSize: 'large' }}>Gissa talet mellan 1 och 100!</p>
            <input
                type="text"
                value={guess}
                onChange={handleInputChange}
                placeholder="Skriv in ditt gissning.."
                style={{ padding: '10px, 10px', width: '200px', marginBottom: '10px' }}
            />
            <button onClick={handleGuess} style={{ padding: '10px, 10px', width: '100%' }}>
                Gissa
            </button>
            {message && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{message}</p>}
        </div>
    );
};

export default GuessingGame;
