import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IFeedback } from '../sections/Feedbacks/list';
import './style.css';

const renderRate = (mark: number): JSX.Element => {
  return <span className='rate-container' style={{width: `${mark * 18}px`}}>
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
  </span>
}

const Component: React.FC<IFeedback> = ({ name, message, mark }) => {
  return <div className='feedbackcard-container'>
    <div className="feedbackcard-title">
      <p className="feedbackcard-name">{name}</p>
      {renderRate(mark)}
    </div>
    <p className="feedbackcard-message">{message}</p>
  </div>
}

export default Component;
