import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3011/api/chatbot', { text: input });
            setResponse(res.data.response);
        } catch (error) {
            console.error('Error sending message to chatbot:', error);
            setResponse('Error communicating with chatbot.');
        }
    };

    return (
        <div>
            <h1>ChatBot</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message"
                />
                <button type="submit">Send</button>
            </form>
            <div>
                <h2>Response:</h2>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default ChatBot;