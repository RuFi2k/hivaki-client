import React from 'react';
import './style.css';

const Section: React.FC = () => {
  return <section className='experience-section'>
    <span className='anchor' id='experience'>anchor</span>
    <h2 className='experience-heading'>
      Только опыт
    </h2>
    <p className="experience-text">
      Я предоставляю только те услуги? в которых имею достаточно практики и знаний/ А их в свою очередь я набираю благодаря моделям с их же разрешения.
    </p>
  </section>
}

export default Section;
