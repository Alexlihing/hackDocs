import React, { useState } from "react";
import axios from "axios";
import "./FindDoctor.css"; // Ensure this file exists in the correct directory

const FindDoctor = () => {
  const [query, setQuery] = useState(""); // Updated from "problem" to "query"
  const [zip, setZip] = useState(""); // Updated from "zipCode" to "zip"
  const [results, setResults] = useState([]); // Store JSON response as an array
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const res = await axios.post("http://localhost:3011/api/find-doctor", {
        query,
        zip,
      });
      console.log("Backend results:", res.data.results); // Debugging log
      setResults(res.data.results || []); // Set the results array
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your problem..."
            className="find-doctor-input"
          />
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Enter your zip code..."
            className="find-doctor-input"
          />
          <button type="submit" className="find-doctor-button">Search</button>
        </form>
        <div className="find-doctor-results">
          {results.length > 0 ? (
            results.map((doctor, index) => (
              <div key={index} className="doctor-card">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-address">
                  Address:{" "}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      doctor.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {doctor.address}
                  </a>
                </p>
                <p className="doctor-description">Description: {doctor.description || "N/A"}</p>
              </div>
            ))
          ) : (
            <p className="no-results">No results yet.</p>
          )}
        </div>
        {error && <p className="find-doctor-error">{error}</p>}
      </div>
    </div>
  );
};

export default FindDoctor;
