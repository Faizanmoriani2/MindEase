import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import '../styles/Dashboard.css';

const moodEmojis = {
  happy: "😀",
  sad: "😔",
  angry: "😠",
  anxious: "😰",
  neutral: "😐",
  tired: "🥱"
};

const moodScale = {
  happy: 5,
  neutral: 3,
  sad: 1,
  angry: 2,
  anxious: 2,
  tired: 2.5
};

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

  // Prepare chart data
  const chartData = moodHistory.map((entry) => ({
    date: new Date(entry.createdAt).toLocaleDateString(),
    moodValue: moodScale[entry.mood] || 3,
    moodLabel: `${moodEmojis[entry.mood] || ""} ${entry.mood}`
  }));

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
          <p>{moodEmojis[lastMood?.mood] || ''} {lastMood?.mood || 'N/A'}</p>
        </div>
        <div className="stat-card">
          <h3>Last Journaled</h3>
          <p>{lastMood ? new Date(lastMood.createdAt).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>

      <div className="dashboard-chart">
        <h2>Mood Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              domain={[0, 6]}
              ticks={[1, 2, 2.5, 3, 5]}
              tickFormatter={(val) =>
                Object.entries(moodScale).find(([m, v]) => v === val)?.[0] || ''
              }
            />
            <Tooltip formatter={(value, name, props) => {
              const mood = Object.entries(moodScale).find(([k, v]) => v === value)?.[0];
              return [`${value}`, `Mood: ${moodEmojis[mood] || ""} ${mood}`];
            }} />
            <Line type="monotone" dataKey="moodValue" stroke="#007bff" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-list">
        <h2>Recent Moods</h2>
        <ul>
          {moodHistory.map((entry, index) => (
            <li key={index}>
              {new Date(entry.createdAt).toLocaleDateString()} — {moodEmojis[entry.mood]} {entry.mood}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
