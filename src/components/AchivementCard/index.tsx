import React from 'react'
import './style.css'

type Props = {
  heading: string,
  text: string,
};

const AchivementCard: React.FC<Props> = ({ heading, text }) => {
  return <div className='achivement-container'>
    <h3>{heading}</h3>
    <p>{text}</p>
  </div>
}

export default AchivementCard;
