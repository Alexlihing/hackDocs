const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
  const text = req.body.text;

  if (text) {
    try {
      const response = await openai.createCompletion({
        model: "gpt-4",
        prompt: text,
        max_tokens: 150,
      });

      res.status(200).send(response.data.choices[0].text);
    } catch (error) {
      res.status(500).send("Error communicating with OpenAI API");
    }
  } else {
    res.status(400).send("Bad request");
  }
});

router.post("/search", async (req, res) => {
    const { query, latitude, longitude, radius } = req.body;

    // Retrieve the API key from environment variables
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
        console.error("Google Places API key is missing");
        return res.status(500).send("Server error: API key not configured");
    }

    if (query && latitude && longitude && radius) {
        try {
            // Construct the Google Places API URL
            const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=doctor&keyword=${encodeURIComponent(query)}&key=${apiKey}`;

            // Fetch data from Google Places API
            const response = await axios.get(googlePlacesUrl);

            // Check if there are results
            if (response.data && response.data.results) {
                const formattedResults = response.data.results.map(place => ({
                    name: place.name,
                    address: place.vicinity,
                    rating: place.rating || "N/A",
                    totalRatings: place.user_ratings_total || 0,
                    location: place.geometry.location,
                }));

                res.status(200).json(formattedResults);
            } else {
                res.status(404).send("No results found");
            }
        } catch (error) {
            console.error("Error communicating with Google Places API:", error.message);
            res.status(500).send("Error communicating with Google Places API");
        }
    } else {
        res.status(400).send("Bad request: query, latitude, longitude, and radius are required");
    }
});

module.exports = router;