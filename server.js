// server.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

app.post("/api/chatbase-excel", async (req, res) => {
  const { question } = req.body;
  if(!question) return res.json({ answer: "Please ask a question." });

  try {
    // Replace with your Chatbase API key
    const CHATBASE_API_KEY = process.env.fkoCrz6CxwPiJEIGA1u3B;

    const response = await fetch("https://api.chatbase.com/v1/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CHATBASE_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        input: question
      })
    });

    const data = await response.json();

    // Extract the answer from Chatbase response
    const answer = data.output_text || "I couldn't find an answer.";
    res.json({ answer });

  } catch(err){
    console.error(err);
    res.status(500).json({ answer: "Oops! Something went wrong." });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
