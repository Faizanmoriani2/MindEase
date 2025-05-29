import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import "../styles/ChatWindow.css";

export default function ChatWindow({ chatId, mood, onNewChat }) {
  const [messages, setMessages] = useState([]);
  const containerRef = useRef();

  const [isLoading, setIsLoading] = useState(false);


  const token = localStorage.getItem("token");

  // 🔁 Fetch all messages when chatId changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:6500/api/v1/chat/${chatId}/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setMessages(data.data.map(msg => ({
            sender: msg.sender,
            message: msg.content
          })));
        }
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    };

    if (chatId) fetchMessages();
  }, [chatId, token]);

  // 📨 Send user message & get AI reply
 const sendMessage = async (text) => {
  setMessages((prev) => [...prev, { sender: "user", message: text }]);
  setIsLoading(true); // optional spinner

  try {
    const res = await fetch(`http://localhost:6500/api/v1/chat/append/${chatId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sender: "user", content: text }),
    });

    const data = await res.json();

    if (data.success && Array.isArray(data.data)) {
      const updatedMessages = data.data.map((msg) => ({
        sender: msg.sender,
        message: msg.content,
      }));
      const filtered = messages.filter(msg => msg.sender !== 'user' || msg.message !== text);
setMessages([...filtered, ...updatedMessages]);
    }
  } catch (err) {
    console.error("AI fetch error:", err);
    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        message: "Sorry, I'm having trouble responding right now.",
      },
    ]);
  } finally {
    setIsLoading(false);
  }
};


  // 📜 Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Companion Chat</h2>
        <button className="new-chat-button" onClick={onNewChat}>
          + New Chat
        </button>
      </div>

    <div ref={containerRef} className="chat-window">
  {messages.map((msg, index) => (
    <MessageBubble key={index} sender={msg.sender} message={msg.message} />
  ))}

  {isLoading && (
    <div className="ai-typing">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  )}
</div>

      <ChatInput onSend={sendMessage} disable={isLoading} />
    </div>
  );
}
