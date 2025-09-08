import fetch from "node-fetch";

export const chatWithOpenAI = async (message, retries = 3, delay = 1000) => {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();

    // If model is overloaded, throw an error to trigger retry
    if (data.error && data.error.code === 503) {
      throw new Error("Model overloaded");
    }

    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply from Gemini";
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying Gemini request. Attempts left: ${retries}. Error: ${error.message}`);
      await new Promise((res) => setTimeout(res, delay)); // wait before retry
      return chatWithOpenAI(message, retries - 1, delay * 2); // exponential backoff
    }
    console.error("Gemini API Error:", error);
    return "Gemini is currently busy. Please try again later.";
  }
};
