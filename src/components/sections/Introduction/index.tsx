import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Section: React.FC = () => {
  return <section className='introduction-section' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/bg.jpeg')`}}>
    <span className='anchor' id='introduction'>anchor</span>
    <div className='introduction-text-block'>
      <h1 className='introduction-heading'>Ваша красота - наша забота</h1>
      <p className='introduction-subheading'>Мы отнесемся к ней с максимальной ответственностью</p>
      <Link to='booking' className='introduction-booking'>Записаться</Link>
    </div>
  </section>
}

export default Section;
