import React, { useState, useEffect } from "react";

const Chatbot = ({ id, context, onClose }) => {
  const [messages, setMessages] = useState([
    { role: "system", content: `You are an assistant. Summarize and answer questions about this news: ${context}` },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Auto-send summary request when chat opens
  useEffect(() => {
    const getSummary = async () => {
      setLoading(true);
      try {
        const response = await puter.ai.chat(messages);
        const reply = response?.message?.content ?? "No reply";
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } catch (error) {
        console.error("AI error:", error);
        setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Couldn’t fetch summary." }]);
      } finally {
        setLoading(false);
      }
    };

    getSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only run once when opened

  // 🔹 Send user’s custom questions
  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await puter.ai.chat(newMessages);
      const reply = response?.message?.content ?? "No reply";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("AI error:", error);
      setMessages([...newMessages, { role: "assistant", content: "⚠️ Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <span>🤖 AI Assistant</span>
        <button onClick={onClose} style={styles.closeBtn}>✖</button>
      </div>

      <div style={styles.chatBox}>
        {messages.slice(1).map((m, i) => (
          <div key={i} style={{ margin: "5px 0" }}>
            <b>{m.role === "user" ? "You" : "AI"}:</b> {m.content}
          </div>
        ))}
        {loading && <p>⏳ Thinking...</p>}
      </div>

      <div style={styles.inputBox}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id={`chat-input-${id}`}
          name={`chat-input-${id}`}
          placeholder="Ask about this news..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendBtn}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  panel: {
    position: "fixed",
    right: "20px",
    top: "50px",
    width: "350px",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    zIndex: 9999,
  },
  header: {
    padding: "10px",
    background: "#222",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  chatBox: {
    padding: "10px",
    flex: 1,
    overflowY: "auto",
    maxHeight: "300px",
  },
  inputBox: {
    display: "flex",
    borderTop: "1px solid #ccc",
  },
  input: {
    flex: 1,
    border: "none",
    padding: "10px",
    outline: "none",
  },
  sendBtn: {
    background: "#222",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
  },
};

export default Chatbot;
