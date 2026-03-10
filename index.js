// pages/index.js
import { useState, useEffect, useRef } from "react";
import Head from "next/head";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [bubbleMessage, setBubbleMessage] = useState("Need help with an Excel formula?");
  const chatRef = useRef(null);

  const bubbleMessages = [
    "Need help fixing an Excel formula?",
    "Confused by a spreadsheet?",
    "Ask me an Excel question!",
    "Stuck in Excel?",
    "I can help with Excel shortcuts!"
  ];

  // Bubble animation
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbleMessage(bubbleMessages[Math.floor(Math.random() * bubbleMessages.length)]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const sendQuestion = async () => {
    if (!input.trim()) return;
    const userMessage = { type: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    const botMessage = { type: "bot", text: "I’m thinking... 🤔" };
    setMessages(prev => [...prev, botMessage]);
    
    setTimeout(() => chatRef.current?.scrollTo(0, chatRef.current.scrollHeight), 50);

    try {
      const res = await fetch("/api/chatbase-excel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input })
      });
      const data = await res.json();
      botMessage.text = data.answer;
      setMessages(prev => [...prev.slice(0, -1), botMessage]);
    } catch (err) {
      botMessage.text = "Oops! Something went wrong.";
      setMessages(prev => [...prev.slice(0, -1), botMessage]);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") sendQuestion(); };

  return (
    <>
      <Head>
        <title>Excel with Eddie</title>
        <meta name="description" content="Personalized 1-on-1 Excel tutoring for beginners, students, and professionals." />
      </Head>

      {/* Main Content */}
      <div style={{ padding: "2rem" }}>
        <h1>Excel with Eddie</h1>
        <p>Learn Excel formulas, PivotTables, dashboards, automation, and real-world Excel skills.</p>
      </div>

      {/* ExcelBot Launcher */}
      <div
        id="excelbot-launcher"
        onClick={() => document.getElementById("excelbot-chat").style.display = "flex"}
        style={{
          position: "fixed",
          bottom: "120px",
          right: "25px",
          width: "110px",
          textAlign: "center",
          cursor: "pointer",
          zIndex: 9999,
        }}
      >
        <img
          src="/assets/images/excelbot.png"
          style={{ width: "100%", animation: "floatbot 3.2s ease-in-out infinite", transition: "transform 0.2s" }}
        />
        <div
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "white",
            background: "#083c5a",
            padding: "4px 10px",
            borderRadius: "10px",
            marginTop: "6px",
          }}
        >
          Ask ExcelBot
        </div>
        <div
          style={{
            position: "absolute",
            right: "120px",
            bottom: "60px",
            background: "white",
            color: "#083c5a",
            fontSize: "14px",
            fontWeight: 600,
            padding: "10px 14px",
            borderRadius: "14px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
            maxWidth: "180px",
            opacity: 1,
          }}
        >
          {bubbleMessage}
        </div>
      </div>

      {/* ExcelBot Chat Modal */}
      <div
        id="excelbot-chat"
        style={{
          display: "none",
          position: "fixed",
          bottom: "150px",
          right: "25px",
          width: "300px",
          maxWidth: "90%",
          background: "white",
          borderRadius: "14px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          flexDirection: "column",
          zIndex: 99999,
        }}
      >
        <div style={{
          background: "#083c5a",
          color: "white",
          padding: "10px",
          fontWeight: 600,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          ExcelBot <span style={{ cursor: "pointer" }} onClick={() => document.getElementById("excelbot-chat").style.display = "none"}>✖</span>
        </div>

        <div ref={chatRef} style={{ maxHeight: "250px", overflowY: "auto", padding: "10px" }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              background: msg.type === "bot" ? "#e8f5f2" : "#083c5a",
              color: msg.type === "bot" ? "#000" : "#fff",
              padding: "6px 10px",
              borderRadius: "8px",
              marginBottom: "6px",
              textAlign: msg.type === "bot" ? "left" : "right",
              fontSize: "14px"
            }}>
              {msg.text}
            </div>
          ))}
        </div>

        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask me about Excel..."
          style={{ border: "none", borderTop: "1px solid #ccc", padding: "8px", width: "100%" }}
        />
      </div>

      {/* Floating Book Now Button */}
      <a
        href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2Vf9dbUSZeggMTjmT-LvTEKoHceYRjE7B4-OpUQvs6OvDsIcignF-XB6CN_WvoiBAnpME6MbdE"
        target="_blank"
        rel="noopener"
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          background: "#16a085",
          color: "white",
          padding: "12px 20px",
          borderRadius: "50px",
          fontWeight: 600,
          zIndex: 9999,
          textDecoration: "none"
        }}
      >
        Book Now
      </a>

      {/* Floatbot animation */}
      <style jsx>{`
        @keyframes floatbot {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </>
  );
}
