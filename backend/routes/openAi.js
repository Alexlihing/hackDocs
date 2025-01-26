const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
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
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant providing health advice.",
          },
          { role: "user", content: `Give health advice on the following: ${text}` },
        ],
        max_tokens: 150,
      });

      if (response.choices && response.choices[0]) {
        res.status(200).json({ response: response.choices[0].message.content.trim() });
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

router.post("/find-doctor", async (req, res) => {
  const { query, zip } = req.body;

  if (!query || !zip) {
    return res.status(400).json({ error: "Bad request: query and zip code are required" });
  }

  try {
    // Construct prompt for OpenAI
    const prompt = `A user is looking for doctors in the area of zip code ${zip}. Their problem is described as: "${query}". Suggest a list of fake doctors with their names, addresses, and a short description of them. Make the names and addresses seem realistic. Format the output as a JSON array with objects like this:
    {
      "name": "Doctor Name",
      "address": "Doctor Address",
      "description": "Brief description of the doctor or their specialty"
    }
    Do not output any text besides the JSON array.`;

    // OpenAI API call
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant providing doctor recommendations.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
    });

    // Log the entire OpenAI response to debug
    console.log("Full OpenAI Response:", JSON.stringify(response, null, 2));

    if (response.choices && response.choices[0]) {
      const rawRecommendations = response.choices[0].message.content.trim();

      // Log the raw recommendations to debug
      console.log("Raw Recommendations:", rawRecommendations);

      // Safely parse the response into JSON
      let recommendations;
      try {
        recommendations = JSON.parse(rawRecommendations);

        // Ensure that each doctor object has a "short description" key
        recommendations = recommendations.map((doctor) => ({
          name: doctor.name,
          address: doctor.address,
          description: doctor["description"] || "No description available",
        }));

        // Return the formatted recommendations
        res.status(200).json({ results: recommendations });
      } catch (parseError) {
        console.error("Error parsing OpenAI response:", parseError);
        return res.status(500).json({ error: "Failed to parse recommendations from OpenAI." });
      }
    } else {
      console.error("Unexpected OpenAI API response:", response);
      res.status(500).json({ error: "Invalid response from OpenAI API" });
    }
  } catch (error) {
    // Log the error details for debugging
    console.error("Error communicating with OpenAI API:", error.message);
    if (error.response?.data) {
      console.error("OpenAI API Error Data:", JSON.stringify(error.response.data, null, 2));
    }
    res.status(500).json({ error: "Error communicating with OpenAI API" });
  }
});



module.exports = router;
