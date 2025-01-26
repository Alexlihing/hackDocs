import React, { useState } from "react";
import axios from "axios";
import "./FindDoctor.css"; // Ensure this file exists in the correct directory

const FindDoctor = () => {
  const [problem, setProblem] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const res = await axios.post("http://localhost:3011/api/find-doctor", {
        problem,
        zipCode,
      });
      const results = res.data.results || [];
      const formattedResults = results
        .map(
          (doctor) =>
            `Name: ${doctor.name}\nAddress: ${doctor.address}\nRating: ${
              doctor.rating || "N/A"
            }\nTotal Reviews: ${doctor.totalRatings || 0}\n`
        )
        .join("\n\n"); // Format results into readable text
      setResponse(formattedResults);
    } catch (err) {
      console.error("Error communicating with the backend:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Error finding doctors.");
    }
  };

  return (
    <div className="find-doctor-container">
      <div className="find-doctor-header">
        <h1>Find a Doctor</h1>
        <p>Input your problem and zip code to find the best doctors near you.</p>
      </div>
      <div className="find-doctor-body">
        <form onSubmit={handleSubmit} className="find-doctor-form">
          <input
            type="text"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Describe your problem..."
            className="find-doctor-input"
          />
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter your zip code..."
            className="find-doctor-input"
          />
          <button type="submit" className="find-doctor-button">Search</button>
        </form>
        <div className="find-doctor-response">
          <h2>Results:</h2>
          <div className="response-box">
            {response ? response : "No results yet."}
          </div>
          {error && <p className="find-doctor-error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default FindDoctor;
