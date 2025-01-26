const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const axios = require("axios");
require("dotenv").config();

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// OpenAI Chatbot Route
router.post("/", async (req, res) => {
  const text = req.body.text;

  if (text) {
    try {
      const response = await openai.completions.create({
        model: "gpt-4",
        prompt: `Give health advice to the best of your ability on the following: ${text}`,
        max_tokens: 150,
      });

      if (response.choices && response.choices[0]) {
        res.status(200).json({ response: response.choices[0].text.trim() });
      } else {
        console.error("Unexpected OpenAI API response:", response);
        res.status(500).json({ error: "Invalid response from OpenAI API" });
      }
    } catch (error) {
      console.error("Error communicating with OpenAI API:", error.message);
      res.status(500).json({ error: "Error communicating with OpenAI API" });
    }
  } else {
    res.status(400).json({ error: "Bad request: text is required" });
  }
});

// Google Places Search Route
router.post("/search", async (req, res) => {
  const { query, latitude, longitude, radius } = req.body;

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.error("Google Places API key is missing");
    return res
      .status(500)
      .json({ error: "Server error: API key not configured" });
  }

  if (query && latitude && longitude && radius) {
    try {
      const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=doctor&keyword=${encodeURIComponent(
        query
      )}&key=${apiKey}`;
      const response = await axios.get(googlePlacesUrl);

      if (response.data && response.data.results) {
        const formattedResults = response.data.results.map((place) => ({
          name: place.name,
          address: place.vicinity,
          rating: place.rating || "N/A",
          totalRatings: place.user_ratings_total || 0,
          location: place.geometry.location,
        }));
        res.status(200).json(formattedResults);
      } else {
        res.status(404).json({ error: "No results found" });
      }
    } catch (error) {
      console.error(
        "Error communicating with Google Places API:",
        error.message
      );
      res
        .status(500)
        .json({ error: "Error communicating with Google Places API" });
    }
  } else {
    res
      .status(400)
      .json({
        error:
          "Bad request: query, latitude, longitude, and radius are required",
      });
  }
});

module.exports = router;
