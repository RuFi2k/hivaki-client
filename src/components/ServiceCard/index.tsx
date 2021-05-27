import React from 'react';
import { ICategory } from '../sections/Services/services';
import './style.css';


const Component: React.FC<ICategory> = ({ title, services, icon }) => {
  const Icon = icon || (() => <></>);
  return <div className='servicecard-container'>
    <h4 className='servicecard-title'>{title}</h4>
    <div className="servicecard-icon">
      <Icon />
    </div>
    <div className="servicecard-list">
      {services.map((s, id) => (
        <div key={id} className="servicecard-item">
          <p className='servicecard-item-title'>{s.title}</p>
          <p className='servicecard-text'>{s.text}</p>
        </div>
      ))}
    </div>
  </div>
}

export default Component;
