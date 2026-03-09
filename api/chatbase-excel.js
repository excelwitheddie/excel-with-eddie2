import fetch from "node-fetch";

export default async function handler(req, res){
  if(req.method !== "POST") return res.status(405).json({ answer:"Method not allowed" });
  const { question } = req.body;
  if(!question) return res.json({ answer:"Please ask a question." });

  try {
    const response = await fetch("https://api.chatbase.com/v1/query", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.CHATBASE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: question,
        platform: "web",
        session_id: "excelbot-session-1"
      })
    });

    const data = await response.json();
    // Chatbase returns reply in 'reply' property
    const answer = data.reply || "Sorry, I couldn't generate an answer.";
    res.json({ answer });

  } catch(err){
    console.error(err);
    res.json({ answer:"I had trouble processing your question." });
  }
}
