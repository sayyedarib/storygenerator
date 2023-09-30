// utils/openai.js

const { OpenAI } = require("openai");

// Initialize OpenAI with your API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const callApi = async ({ prompt }) => {
  console.log("Calling OpenAI API");
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `${prompt}` }],
      model: "gpt-3.5-turbo",
    });
    console.log("chatCompletion", chatCompletion);
    return chatCompletion;
  } catch (error) {
    console.error(error);
    throw error;
  }
  // return {message: "Hello"};
};

module.exports = callApi;
