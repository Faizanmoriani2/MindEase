import React from 'react'
import '../styles/History.css'
import HistoryCard from './HistoryCard'

const History = () => {
  return (
    <div className='history'>
      <div className="history-title">
        <h2>History</h2>
      </div>
      <div className="history-data">
        <HistoryCard date='23 April 2025' description='Hi, this is the day I have been talking about my mood. '/>
        <HistoryCard />
        <HistoryCard />
   
      </div>
    </div>
  )
}

export default History
