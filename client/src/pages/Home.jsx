import { useEffect, useState } from 'react';
import History from '../components/History';
import ChatWindow from '../components/ChatWindow';
import MoodSelector from '../components/MoodSelector';
import '../styles/Home.css';

const Home = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [history, setHistory] = useState([]);

  const moodInitialReplies = {
    happy: "That's great to hear! Wanna share what made you smile?",
    sad: "I'm here for you. Want to talk about it?",
    neutral: "I'm here if you need to chat.",
    angry: "Take a deep breath. Want to talk about what upset you?",
    anxious: "You're not alone. Want to tell me what's on your mind?",
    tired: "It's okay to feel tired. Want to share how your day was?",
  };


  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchHistory = async () => {
    const res = await fetch(`http://localhost:6500/api/v1/chat/user/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.success) {
      setHistory(data.data);
    }
  };

  const handleMoodSelect = async (mood) => {
  setSelectedMood(mood);

  const res = await fetch("http://localhost:6500/api/v1/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: user._id,
      mood,
    }),
  });

  const data = await res.json();
  if (data.success) {
    setChatId(data.data._id);
    fetchHistory();

    // Append the AI starter message
    const initialMessage = moodInitialReplies[mood] || "I'm here with you.";
    
    // Save it as a message from the AI
    await fetch(`http://localhost:6500/api/v1/chat/append/${data.data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sender: "ai",
        content: initialMessage
      }),
    });
  }
};


  const handleNewChat = () => {
    setSelectedMood(null);
    setChatId(null);
  };

  const handleSelectFromHistory = (id) => {
    setChatId(id);
    setSelectedMood(null); // optional: or you can derive mood from history
  };

  useEffect(() => {
    if (user && token) fetchHistory();
  }, []);

const handleDeleteChat = async (chatIdToDelete) => {
  const confirm = window.confirm("Are you sure you want to delete this chat?");
  if (!confirm) return;

  try {
    const res = await fetch(`http://localhost:6500/api/v1/chat/${chatIdToDelete}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.success) {
      setHistory((prev) => prev.filter(chat => chat._id !== chatIdToDelete));
      if (chatId === chatIdToDelete) {
        setChatId(null);
        setSelectedMood(null);
      }
    } else {
      alert("Failed to delete chat.");
    }
  } catch (err) {
    console.error("Delete chat error:", err);
    alert("Something went wrong while deleting the chat.");
  }
};


  return (
    <div className='home'>
      <div className="history-container">
        <History history={history} onSelectChat={handleSelectFromHistory} onDeleteChat={handleDeleteChat}/>
      </div>

      <div className="chatbox-container">
        {!chatId ? (
          <MoodSelector onSelect={handleMoodSelect} />
        ) : (
          <ChatWindow
            chatId={chatId}
            mood={selectedMood}
            onNewChat={handleNewChat}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
