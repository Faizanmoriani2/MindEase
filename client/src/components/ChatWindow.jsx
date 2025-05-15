import React, { useState, useEffect, useRef } from 'react';
import MoodSelector from './MoodSelector';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import '../styles/ChatWindow.css';

export default function ChatWindow() {
  const [mood, setMood] = useState(null);
  const [messages, setMessages] = useState([]);
  const containerRef = useRef();

  const handleNewChat = () => {
    setMood(null);
    setMessages([]);
  };

  const sendMessage = (text) => {
    setMessages((prev) => [...prev, { sender: 'user', message: text }]);
    // Placeholder AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', message: "Thanks for opening up, I'm here for you." },
      ]);
    }, 600);
  };

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
    setMessages([
      {
        sender: 'ai',
        message: `Thanks for checking in. You're feeling ${selectedMood} today. Want to talk about it?`,
      },
    ]);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Companion Chat</h2>
        <button className="new-chat-button" onClick={handleNewChat}>
          + New Chat
        </button>
      </div>

      {!mood && <MoodSelector onSelect={handleMoodSelect} />}
      
      <div ref={containerRef} className="chat-window">
        {messages.map((msg, index) => (
          <MessageBubble key={index} sender={msg.sender} message={msg.message} />
        ))}
      </div>

      {mood && <ChatInput onSend={sendMessage} />}
    </div>
  );
}
