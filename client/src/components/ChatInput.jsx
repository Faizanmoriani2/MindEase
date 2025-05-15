import React, { useState } from 'react';
import '../styles/ChatWindow.css';

export default function ChatInput({ onSend }) {
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
        placeholder="Write how you're feeling..."
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
}
