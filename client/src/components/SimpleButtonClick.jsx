import { useState } from "react";

const SimpleButton = () => {
    const [message, setMessage] = useState("");
    const messageList = ["Hello World!", "Goodbye World!", "I like tomatoes", "Blue cars are the coolest", "If you don't breathe you die", "Eat pizza once a week for a healthy diet!"]

    const handleClick = () => {
        let randomMessageIndex = Math.floor(Math.random() * messageList.length);
        console.log(randomMessageIndex)
        setMessage(messageList[randomMessageIndex]);
    };

    return (
        <div>
            <button onClick={handleClick}>Klicka här för meddelande</button>
            {message && <p>{message}</p>}
        </div>
    )
}

export default SimpleButton;