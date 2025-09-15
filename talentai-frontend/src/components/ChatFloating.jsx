import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FiMessageSquare, FiX } from "react-icons/fi";

export default function ChatFloating() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { type: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:8080/api/chat", {
        message: userMsg.text,
      });
      const aiMsg = { type: "ai", text: data.reply };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const aiMsg = { type: "ai", text: "Error contacting AI." };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="w-80 h-[480px] bg-white shadow-xl rounded-xl flex flex-col border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-3 bg-blue-600 text-white font-semibold flex justify-between items-center">
            AI Chat
            <button
              onClick={() => setOpen(false)}
              className="p-1 hover:bg-blue-500 rounded-full transition"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[75%] break-words ${
                  msg.type === "user"
                    ? "bg-blue-100 self-end text-gray-800"
                    : "bg-gray-200 self-start text-gray-900"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex items-center gap-2 bg-white">
            <input
              type="text"
              placeholder={loading ? "Waiting..." : "Type a message"}
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition flex items-center justify-center"
          title="Open Chat"
        >
          <FiMessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
