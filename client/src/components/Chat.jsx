import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const { chatToken } = useParams();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`/api/chat/${chatToken}`, {
                    credentials: "include"
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setMessages(data);
                } else {
                    console.error("Failed to fetch messages");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchMessages();
    }, [chatToken]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/chat/${chatToken}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message }),
                credentials: "include"
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(data);
                setMessage("");
            } else {
                console.error("Failed to send message");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="chat-container">
            <h1>Chat</h1>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className="chat-message">
                        <strong>{message.sender}</strong>: {message.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="chat-form">
                <input
                    type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Type your message here"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;