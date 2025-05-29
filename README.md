# 🧠 MindEase – AI-Powered Mental Health Journaling Companion

> Built for the [**Beyond the Code: Human-Centered Tech**](#) hackathon

**MindEase** is a web-based AI companion that helps you track and manage your emotions in a safe, supportive space. Select your mood, start a chat, and receive compassionate, mood-aware responses powered by DeepSeek AI.

---

## ✨ Features

- 🎭 **Mood-based Journaling** — Select your mood before chatting (e.g., happy, sad, anxious)
- 🤖 **AI Companion** — DeepSeek AI responds with empathy based on your emotional state
- 📈 **Mood Dashboard** — Track your emotional journey over time with emoji-labeled charts
- 💬 **Chat History** — Revisit previous sessions with a ChatGPT-style side panel
- 🛑 **Irrelevant Filter** — Prevents off-topic or casual use; focuses on emotional wellness
- 🧼 **Minimal UI** — Designed with simplicity and calm in mind

---

## 🛠 Built With

### Languages & Frameworks
- **JavaScript (ES6+)**
- **React.js** (Frontend)
- **Node.js + Express.js** (Backend)
- **MongoDB + Mongoose** (Database)

### AI & APIs
- **DeepSeek-AI/DeepSeek-R1-Distill-Llama-8B** – via Hugging Face Inference API
- **Hugging Face JS Client**

### Other Tools
- **JWT Auth** – Secure login/signup
- **React Markdown** – Render formatted AI replies
- **Chart.js** – For mood tracking dashboard
- **Vanilla CSS** – Calming custom styles
- **Vite** – React tooling
- **Postman** – API testing

---

## 🚀 Getting Started

### 📦 Prerequisites
- Node.js & npm
- MongoDB (local or cloud)
- Hugging Face API Key (for DeepSeek)

### 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/mindease.git
cd mindease

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Setting up .env in you backend (/server)

Create a .env file in the /server folder:

PORT=5000 
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
HF_API_KEY=your_huggingface_api_key

## Run Locally on your machine

### Start backend
cd server
node --env-file .env ./app.js

### Start frontend
cd client
npm run dev



