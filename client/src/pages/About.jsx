import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>Welcome to MindEase 🌿</h1>
        <p>Your private, AI-powered emotional journaling companion.</p>
      </div>

      <div className="about-section">
        <h2>🌟 Our Mission</h2>
        <p>
          MindEase is built to support your mental and emotional well-being. In just a few clicks, you can start
          a conversation with a thoughtful AI that responds based on your mood.
        </p>
      </div>

      <div className="about-section">
        <h2>🏆 Hackathon Showcase</h2>
        <p>
            MindEase was proudly built as part of the <strong>"Beyond the Code: Human-Centered Tech"</strong> hackathon — a challenge that encourages solutions focused on <em>real-world needs</em> and <em>user-centered design</em>. 
        </p>
        </div>

      <div className="about-section">
        <h2>💡 Why MindEase?</h2>
        <ul>
          <li><strong>Human-Centered UX:</strong> Designed with simplicity, comfort, and empathy.</li>
          <li><strong>AI With Boundaries:</strong> Only responds to emotional topics, not general chit-chat.</li>
          <li><strong>Mood Tracking:</strong> Understand how your emotions shift over time.</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>🛠️ Built With</h2>
        <p>MERN Stack (MongoDB, Express, React, Node.js) & DeepSeek AI via Hugging Face.</p>
      </div>

      <div className="about-footer">
        <p>MindEase © 2025. Made for Hackathon & Healing. 💙</p>
      </div>
    </div>
  );
};

export default About;
