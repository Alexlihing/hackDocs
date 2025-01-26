import React, { useState, useEffect } from "react";
import "./MedicineLogger.css";

const MedicineLogger = () => {
  const [userMedicines, setUserMedicines] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUserMedicines = async () => {
      try {
        const response = await fetch(
          "http://localhost:3011/api/users/profile",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData = await response.json();

        if (userData.medicines && userData.medicines.length > 0) {
          const medicineDetailsPromises = userData.medicines.map(
            async (medicineName) => {
              const drugResponse = await fetch(
                `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${medicineName}"&limit=1`
              );
              return drugResponse.json();
            }
          );

          const medicineDetails = await Promise.all(medicineDetailsPromises);
          setUserMedicines(medicineDetails);
        }
      } catch (error) {
        console.error("Error fetching user medicines:", error);
      }
    };

    fetchUserMedicines();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${searchTerm}"&limit=5`
      );
      const data = await response.json();

      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error searching medicines:", error);
    }
  };

  const addMedicine = async (medicineName) => {
    try {
      const response = await fetch(
        "http://localhost:3011/api/users/addmedicine",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ medicineName }),
        }
      );

      const drugResponse = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${medicineName}"&limit=1`
      );
      const drugData = await drugResponse.json();

      setUserMedicines((prev) => [...prev, drugData.results[0]]);
      setSearchResults([]);
      setSearchTerm("");
    } catch (error) {
      console.error("Error adding medicine:", error);
    }
  };

  return (
    <div className="medicine-logger">
      <h2 className="medicine-header">My Medicines</h2>

      <div className="medicine-list">
        {userMedicines.map((medicine, index) => (
          <div key={index} className="medicine-card">
            <h3>{medicine.openfda?.generic_name?.[0] || "Unknown Medicine"}</h3>
            <p>{medicine.purpose?.[0] || "No description available"}</p>
          </div>
        ))}
      </div>

      <div className="search-section">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a medicine"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      <div className="search-results">
        {searchResults.map((result, index) => (
          <div key={index} className="medicine-card">
            <h3>{result.openfda?.generic_name?.[0] || "Unknown Medicine"}</h3>
            <p>{result.purpose?.[0] || "No description available"}</p>
            <button
              onClick={() => addMedicine(result.openfda?.generic_name?.[0])}
              className="add-button"
            >
              Add Medicine
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineLogger;
