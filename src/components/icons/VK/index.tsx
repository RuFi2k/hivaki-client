import { faVk } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './style.css';

const Icon: React.FC<{to: string}> = ({ to }) => {
  return <a href={to} target="__blank" className='vk-container'>
    <FontAwesomeIcon icon={faVk} className='vk-icon' />
    <p className='vk-text'>VK</p>
  </a>
}

export default Icon;
