export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(200).json({ answer: "Method not allowed" });
  }

  const { question } = req.body;

  try {

    const response = await fetch("https://api.chatbase.com/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.CHATBASE_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-mini",
        messages: [
          { role: "system", content: "You are ExcelGPT, an Excel expert." },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      answer: data?.choices?.[0]?.message?.content || "No answer returned."
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      answer: "Server error."
    });

  }

}
