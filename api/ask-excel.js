import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/ask-excel", async (req, res) => {
  const { question } = req.body;

  try {
    const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are ExcelBot, an expert Excel assistant who answers Excel questions clearly and concisely, including formulas, PivotTables, shortcuts, VBA, and error troubleshooting." },
          { role: "user", content: question }
        ],
        temperature: 0.2
      })
    });

    const gptData = await gptRes.json();
    const answer = gptData.choices[0].message.content;
    res.json({ answer });
  } catch(err){
    console.error(err);
    res.json({ answer: "I had trouble processing your question." });
  }
});

app.listen(3000, () => console.log("ExcelBot server running on port 3000"));
