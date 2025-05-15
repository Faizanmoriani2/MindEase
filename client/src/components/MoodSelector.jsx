import React from 'react';
import '../styles/ChatWindow.css';

const moods = [
  { emoji: '😀', label: 'happy' },
  { emoji: '😐', label: 'neutral' },
  { emoji: '😔', label: 'sad' },
  { emoji: '😠', label: 'angry' },
  { emoji: '😰', label: 'anxious' },
  { emoji: '🥱', label: 'tired' },
];

export default function MoodSelector({ onSelect }) {
  return (
    <div className="mood-selector">
      <h2>How are you feeling today?</h2>
      <div className="mood-options">
        {moods.map((m) => (
          <button
            key={m.label}
            className="emoji-button"
            onClick={() => onSelect(m.label)}
            title={m.label}
          >
            {m.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
