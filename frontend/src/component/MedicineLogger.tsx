import React, { useState, useEffect } from "react";

const MedicineLogger = () => {
  const [userMedicines, setUserMedicines] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch user profile and medicines
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

        // If user has medicines, fetch their details
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
      // Search FDA drug database
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

      // Log the full response for debugging
      const responseBody = await response.text();
      console.log("Response status:", response.status);
      console.log("Response body:", responseBody);

      if (!response.ok) {
        throw new Error(
          `Failed to add medicine. Status: ${response.status}, Body: ${responseBody}`
        );
      }

      // Optimistically update frontend state
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
    <div>
      <h2>My Medicines</h2>

      {/* Current User Medicines */}
      {userMedicines.map((medicine, index) => (
        <div key={index}>
          <h3>{medicine.openfda?.generic_name?.[0] || "Unknown Medicine"}</h3>
          <p>{medicine.purpose?.[0] || "No description available"}</p>
        </div>
      ))}

      {/* Medicine Search */}
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a medicine"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Search Results */}
      {searchResults.map((result, index) => (
        <div key={index}>
          <h3>{result.openfda?.generic_name?.[0] || "Unknown Medicine"}</h3>
          <p>{result.purpose?.[0] || "No description available"}</p>
          <button
            onClick={() => addMedicine(result.openfda?.generic_name?.[0])}
          >
            Add Medicine
          </button>
        </div>
      ))}
    </div>
  );
};

export default MedicineLogger;
