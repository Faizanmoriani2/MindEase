import React from 'react'
import History from '../components/History'
import Chatbox from '../components/Chatbox'
import "../styles/Home.css"
import ChatWindow from '../components/ChatWindow'

const Home = () => {
  return (
    <div className='home'>

      <div className="history-container">
        <History/>
      </div>

      <div className="chatbox-container">
        {/* <Chatbox /> */}
        <ChatWindow />
      </div>
      
    </div>
  )
}

export default Home
