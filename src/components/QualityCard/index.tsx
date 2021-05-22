import React from 'react';
import { IQuality } from '../sections/Qualities/list';
import './style.css';

const Component: React.FC<IQuality> = ({ title, icon, description }) => {
  const Icon = icon || React.Fragment;
  return <div className='card-container-wrapper'>
    <div className='card-container'>
      <h3 className='card-title'>{title}</h3>
      <div className='card-icon'>
        <Icon />
      </div>
      <p className='card-description'>{description}</p>
    </div>
  </div>
}

export default Component;
