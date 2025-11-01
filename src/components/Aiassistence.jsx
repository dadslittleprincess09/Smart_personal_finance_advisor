import React, { useState } from "react";

const Aiassistence = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I'm your Financial Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const API_URL = "http://127.0.0.1:5000/get_response";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: input }), // 👈 same key as Flask expects
      });

      const data = await response.json();
      const aiReply = data.response || "Sorry, I didn’t catch that.";

      setMessages((prev) => [...prev, { sender: "bot", text: aiReply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server not responding. Try again later." },
      ]);
    }
  };

  return (
    <div
      className="d-flex flex-column bg-light shadow rounded-4"
      style={{
        width: "100%",
        height: "80vh",
      }}
    >
      <div className="bg-white shadow-sm py-3 px-3 border-bottom text-center text-md-start rounded-top-4">
        <h6 className="m-0 text-dark">
          <i className="bi bi-chat-text me-2"></i>Financial Assistant
        </h6>
      </div>

      <div
        className="p-3 overflow-auto flex-grow-1"
        style={{
          backgroundColor: "#f7f7f8",
          lineHeight: "1.6",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`d-flex mb-3 ${
              msg.sender === "user" ? "justify-content-end" : "justify-content-start"
            }`}
          >
            <div
              className={`p-3 rounded-4 shadow-sm border ${
                msg.sender === "user" ? "bg-primary text-white" : "bg-white text-dark"
              }`}
              style={{
                maxWidth: "80%",
                wordBreak: "break-word",
                fontSize: "0.95rem",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border-top px-3 py-2 rounded-bottom-4">
        <form className="d-flex align-items-center w-100" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-control rounded-pill me-2 flex-grow-1"
            placeholder="Type your message..."
            style={{ fontSize: "0.9rem", padding: "8px 14px" }}
          />
          <button
            className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
            type="submit"
            style={{ width: "38px", height: "38px" }}
          >
            <i className="bi bi-send-fill fs-6"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Aiassistence;
