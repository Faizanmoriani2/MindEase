import React from 'react';
import '../styles/ChatWindow.css';
import ReactMarkdown from 'react-markdown';

export default function MessageBubble({ sender, message }) {
  const isUser = sender === 'user';
  return (
    <div className={`message-row ${isUser ? 'right' : 'left'}`}>
      <div className={`message-bubble ${isUser ? 'user' : 'ai'}`}>
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </div>
  );
}
