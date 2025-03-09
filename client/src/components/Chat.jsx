import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Chat() {
    const { user } = useUser();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [issueId, setIssueId] = useState(null);
    const { chatToken } = useParams();

    const fetchMessages = useCallback(async () => {
        try {
            const response = await fetch(`/api/chat/${chatToken}`, {
                credentials: "include"
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                if (Array.isArray(data)) {
                    setMessages(data);
                    setIssueId(data[0].issueId);

                } else {
                    setIssueId(data)

                }
            } else {
                console.error("Failed to fetch messages");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }, [chatToken]);

    useEffect(() => {
        console.log("Setting up chat room")
        fetchMessages();

        const interval = setInterval(fetchMessages, 5000);
        return () => {
            console.log("Leaving chat room, cleaning up")
            clearInterval(interval);
        }
    }, [fetchMessages]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let sender = user.role;
        try {
            const response = await fetch("/api/chat/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ issueId: issueId, sender: sender, content: message }),
                credentials: "include"
            });
            console.log(issueId, sender, message);

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                await fetchMessages();
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
            <h1>Chat for Issue: {issueId}</h1>
            <div className="chat-messages">
                {messages.map((message) => (
                    <div key={message.id} className="chat-message">
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