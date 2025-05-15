import React from 'react'
import '../styles/HistoryCard.css'

const HistoryCard = ({date='05 Aril 2024',
   description='lorem psum dolor sit amet consectetur amet consectetur adipisicing elit. Corporate.'}) => {

  return (
    <div className='history-card'>
        <div className="history-card-date">
            <p>{date}</p>
        </div>
        <br />
        <div className="history-card-content">
            <p>
                {description}
            </p>
        </div>
    </div>
  )
}

export default HistoryCard
