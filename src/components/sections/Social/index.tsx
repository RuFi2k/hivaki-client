import React from 'react';
import socials from './list';
import './style.css';

const Section: React.FC = () => {
  return <section id='social' className='social-container'>
    <span className="anchor" id="social">anchor</span>
    <div className='social-section'>
      <h2 className='social-heading'>Дальше - лучше!</h2>
      <p className='social-text'>
        Следите за новостями в соцсетях Там можно найти много интересной и полезной информации 😀
      </p>
      <div className='social-list'>
        {socials.map(({ link, icon }, i) => {
          const Icon = icon;
          return <Icon key={i} to={link}/>
        })}
      </div>
    </div>
  </section>;
}

export default Section;
