import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [moodHistory, setMoodHistory] = useState([]);
  const [totalChats, setTotalChats] = useState(0);
  const [lastMood, setLastMood] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  const fetchMoodHistory = async () => {
    try {
      const res = await fetch(`http://localhost:6500/api/v1/chat/mood-history/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setMoodHistory(data.data);
        setTotalChats(data.data.length);
        setLastMood(data.data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch mood history", error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome back, {user.name}!</h1>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Chats</h3>
          <p>{totalChats}</p>
        </div>
        <div className="stat-card">
          <h3>Last Mood</h3>
          <p>{lastMood?.mood || 'N/A'}</p>
        </div>
        <div className="stat-card">
          <h3>Last Journaled</h3>
          <p>{lastMood ? new Date(lastMood.createdAt).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>

      <div className="dashboard-chart">
        <h2>Mood Trends</h2>
        <ul>
          {moodHistory.map((entry, index) => (
            <li key={index}>{new Date(entry.createdAt).toLocaleDateString()} — {entry.mood}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
