import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './style.css';

const Icon: React.FC<{to: string}> = ({ to }) => {
  return <a href={to} target="__blank" className='instagram-container'>
    <FontAwesomeIcon icon={faInstagram} className='instagram-icon' />
    <p className='instagram-text'>Instagram</p>
  </a>
}

export default Icon;