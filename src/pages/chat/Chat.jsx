import { useEffect, useRef, useState } from "react";
import { sendMessage } from "../../services/chatApi";
import "./Chat.css";

function Chat() {

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello! I'm SHA. How can I help you today?"
        }
    ]);

    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, loading]);

    async function handleSend() {

        if (!message.trim() || loading) return;

        const userMessage = message;

        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                text: userMessage
            }
        ]);

        setMessage("");
        setLoading(true);

        try {

            const response = await sendMessage(userMessage);

            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text: response.response
                }
            ]);

        } catch (error) {

            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text: "❌ Unable to reach the server."
                }
            ]);

        } finally {

            setLoading(false);
            inputRef.current?.focus();

        }

    }

    function handleKeyDown(event) {

        if (event.key === "Enter") {
            handleSend();
        }

    }

    return (
        <div className="chat-page">

            <div className="chat-header">
                <h2>SHA Chat</h2>
            </div>

            <div className="chat-messages">

                {messages.map((msg, index) => (

                    <div
                        key={index}
                        className={`message ${msg.sender}`}
                    >
                        {msg.text}
                    </div>

                ))}

                {loading && (
                    <div className="message bot thinking">
                        SHA is thinking...
                    </div>
                )}

                <div ref={messagesEndRef}></div>

            </div>

            <div className="chat-input">

                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                />

                <button
                    onClick={handleSend}
                    disabled={loading}
                >
                    {loading ? "Thinking..." : "Send"}
                </button>

            </div>

        </div>
    );
}

export default Chat;