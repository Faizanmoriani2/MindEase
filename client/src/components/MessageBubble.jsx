import React from 'react';
import '../styles/ChatWindow.css';

export default function MessageBubble({ sender, message }) {
  const isUser = sender === 'user';
  return (
    <div className={`message-row ${isUser ? 'right' : 'left'}`}>
      <div className={`message-bubble ${isUser ? 'user' : 'ai'}`}>
        {message}
      </div>
    </div>
  );
}
