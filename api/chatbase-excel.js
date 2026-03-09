// /api/chatbase-excel.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ answer: "Method not allowed" });
  }

  const { question } = req.body;
  if (!question) return res.status(400).json({ answer: "No question provided." });

  try {
    // Replace with your Chatbase GPT API key
    const CHATBASE_API_KEY = process.env.CHATBASE_API_KEY;

    const response = await fetch("https://api.chatbase.com/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${fkoCrz6CxwPiJEIGA1u3B}`
      },
      body: JSON.stringify({
        model: "gpt-4-mini",          // or whichever model you want
        messages: [
          { role: "system", content: "You are ExcelGPT, an expert Excel assistant." },
          { role: "user", content: question }
        ],
        temperature: 0.2
      })
    });

    const data = await response.json();

    // Chatbase returns text here
    const answer = data?.choices?.[0]?.message?.content || "Sorry, I couldn't find an answer.";

    return res.status(200).json({ answer });

  } catch (err) {
    console.error("Chatbase API error:", err);
    return res.status(500).json({ answer: "Oops! Something went wrong." });
  }
}
