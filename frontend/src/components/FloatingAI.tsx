import { useState } from "react";
import "./FloatingAI.css";
import { askCareer } from "../Services/ChatServices";

function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([
    "Hi! How can I help you find jobs today?"
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await askCareer({
        message: userMessage,
        session_id: "default",
      });

      setMessages((prev) => [...prev, response.response]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, "Sorry, I had trouble reaching the career server. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="floating-ai-container">
      {isOpen && (
        <div className="ai-chatbox">
          <div className="chatbox-header">
            <span>🤖 Career AI Assistant</span>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className="chatbox-body">
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-bubble ${idx % 2 === 0 ? "ai" : "user"}`}>
                {m}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble ai thinking">
                Thinking...
              </div>
            )}
          </div>
          
          <div className="chatbox-footer">
            <input
              type="text"
              placeholder={loading ? "Thinking..." : "Ask something..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
      <button className="ai-fab-button" onClick={() => setIsOpen(!isOpen)}>
        💬 AI Help
      </button>
    </div>
  );
}

export default FloatingAI;
