"use client";

import { useState } from "react";

interface Message {
  query: string;
  answer: string;
}

export default function Chat() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        console.error("Error fetching response");
        return;
      }

      const data = await res.json();
      setMessages((prevMessages) => [...prevMessages, { query, answer: data.answer }]);
      setQuery("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container p-4 max-w-lg mx-auto border rounded shadow-md">
      <div className="messages space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="message p-2 border rounded bg-gray-100">
            <strong>You:</strong> {msg.query}
            <br />
            <strong>Bot:</strong> {msg.answer}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask about my resume..."
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        className={`w-full p-2 text-white rounded transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Loading..." : "Send"}
      </button>
    </div>
  );
}
