import React from 'react';
import socials from './list';
import './style.css';

const Section: React.FC = () => {
  return <section className='social-container'>
    <div className='social-section'>
      <h2 className='social-heading'>Дальше - лучше!</h2>
      <p className='social-text'>
        Следите за новостями в соцсетях Там можно найти много интересной и полезной информации 😀
      </p>
      <div className='social-list'>
        {socials.map(({ link, icon }) => {
          const Icon = icon;
          return <Icon to={link}/>
        })}
      </div>
    </div>
  </section>;
}

export default Section;
