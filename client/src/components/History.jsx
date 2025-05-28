import React from 'react';
import '../styles/History.css';
import HistoryCard from './HistoryCard';

const History = ({ history, onSelectChat, onDeleteChat }) => {
  return (
    <div className='history'>
      <div className="history-title">
        <h2>History</h2>
      </div>
      <div className="history-data">
        {history.map(chat => (
          <div key={chat._id} className="history-item">
            <div onClick={() => onSelectChat(chat._id)} style={{ cursor: "pointer" }}>
              <HistoryCard
                date={new Date(chat.createdAt).toLocaleDateString()}
                description={`Mood: ${chat.mood}`}
              />
            </div>
            <button
              className="delete-chat-button"
              onClick={() => onDeleteChat(chat._id)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
