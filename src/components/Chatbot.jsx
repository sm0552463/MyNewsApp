import { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Use Puter.js
      const response = await puter.ai.chat(input);
      // response has { message: { role, content } }
      const reply = response?.message?.content ?? "No reply";

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error("Puter.ai error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I encountered an error." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        id="chatbot_btn"
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-primary rounded-circle position-fixed"
        style={{ top: "60px", right: "100px", width: "50px", height: "50px" }}
      >
        💬Ask AI..
      </button>

      {isOpen && (
        <div
          className="card position-fixed shadow"
          style={{ bottom: "80px", right: "20px", width: "320px", height: "400px" }}
        >
          <div className="card-header bg-primary text-white">
            <strong>Chatbot</strong>
          </div>
          <div
            className="card-body overflow-auto"
            style={{ flex: 1, maxHeight: "300px" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 ${msg.sender === "user" ? "text-end" : "text-start"}`}
              >
                <span
                  className={`badge ${
                    msg.sender === "user" ? "bg-secondary" : "bg-info text-dark"
                  }`}
                >
                  {msg.sender}
                </span>
                <p className="d-inline-block ms-2">{msg.text}</p>
              </div>
            ))}
            {loading && <p className="text-muted">Bot is typing...</p>}
          </div>
          <div className="card-footer p-2">
            <div className="input-group">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="form-control"
                placeholder="Type a message..."
              />
              <button onClick={sendMessage} className="btn btn-primary">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
