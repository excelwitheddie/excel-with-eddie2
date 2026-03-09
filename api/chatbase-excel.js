// api/chatbase-excel.js
import fetch from "node-fetch";

export default async function handler(req, res){
  if(req.method !== "POST") return res.status(405).json({ answer: "Method not allowed" });

  const { question } = req.body;
  if(!question) return res.json({ answer: "Please ask a question." });

  try {
    const CHATBASE_API_KEY = process.env.CHATBASE_API_KEY; // set in Vercel/Netlify env

    const response = await fetch("https://api.chatbase.com/v1/query", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${CHATBASE_API_KEY}`
      },
      body: JSON.stringify({
        model:"gpt-4",
        input:question
      })
    });

    const data = await response.json();
    const answer = data.output_text || "I couldn't find an answer.";
    res.status(200).json({ answer });

  } catch(err){
    console.error(err);
    res.status(500).json({ answer: "Oops! Something went wrong." });
  }
}
