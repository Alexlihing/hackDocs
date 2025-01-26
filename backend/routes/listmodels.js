const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

(async () => {
  try {
    const response = await openai.listModels();
    console.log("Available models:", response.data.data);
  } catch (error) {
    console.error("Error listing models:", error.response?.data || error.message);
  }
})();
