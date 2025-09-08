// src/controllers/chatController.js
import { chatWithOpenAI } from "../config/openai.js";

export const chatController = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const reply = await chatWithOpenAI(message); // retries handled inside the function
    res.json({ reply });
  } catch (error) {
    console.error("Chatbot Controller Error:", error); // detailed log
    res.status(500).json({
      error: error.message || "Something went wrong with the chatbot",
    });
  }
};
