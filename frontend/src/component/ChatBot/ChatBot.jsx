import React, { useState } from "react";
import axios from "axios";
import "./ChatBot.css";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      console.log("Sending input to backend:", input); // Log input
      const res = await axios.post("http://localhost:3011/api/chatbot", { text: input });
      console.log("Response received from backend:", res.data.response); // Log response
      setResponse(res.data.response); // Expecting response from backend
    } catch (err) {
      console.error("Error response from backend:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Error communicating with chatbot.");
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h1>Chat with Our Bot</h1>
        <p>Get instant assistance from our AI-powered chatbot.</p>
      </div>
      <div className="chatbot-body">
        <form onSubmit={handleSubmit} className="chatbot-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="chatbot-input"
          />
          <button type="submit" className="chatbot-button">Send</button>
        </form>
        <div className="chatbot-response">
          <h2>Response:</h2>
          <div className="response-box">
            {response ? <p>{response}</p> : <p>No response yet.</p>}
          </div>
          {error && <p className="chatbot-error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
