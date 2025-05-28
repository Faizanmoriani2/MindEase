import React, { useState } from 'react';
import '../styles/ChatWindow.css';

export default function ChatInput({ onSend, disable }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        className="chat-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={disable ? "Thinking..." : "Type your message..."}
        disabled={disable}
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
}
