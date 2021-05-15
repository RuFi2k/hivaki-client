import React from 'react';
import './style.css';

const Introduction: React.FC = () => {
  return <section className='introduction-section'>
    <div className='introduction-text-block'>
      <h1 className='introduction-heading'>Ваша красота - наша забота</h1>
      <p className='introduction-subheading'>Мы отнесемся к ней с максимальной ответственностью</p>
    </div>
  </section>
}

export default Introduction;
