import React, { useState } from 'react';

const DoctorSearch = () => {
    const [zipCode, setZipCode] = useState('');
    const [description, setDescription] = useState('');

    const handleSearch = () => {
        // Implement the search logic here
        console.log(`Searching for doctors in zip code: ${zipCode} with description: ${description}`);
    };

    return (
        <div>
            <h2>Doctor Search</h2>
            <div>
                <label>
                    Zip Code:
                    <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default DoctorSearch;