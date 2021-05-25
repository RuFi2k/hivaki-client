import React from 'react';
import './style.css';

const Section: React.FC = () => {
  return <section className='introduction-section'>
    <span className='anchor' id='introduction'>anchor</span>
    <div className='introduction-text-block'>
      <h1 className='introduction-heading'>Ваша красота - наша забота</h1>
      <p className='introduction-subheading'>Мы отнесемся к ней с максимальной ответственностью</p>
    </div>
  </section>
}

export default Section;
