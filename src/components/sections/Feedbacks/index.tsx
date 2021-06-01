import React from 'react';
import { Link } from 'react-router-dom';
import list from './list';
import { FeedbackCard } from '../..';
import './style.css';

const Section: React.FC = () => {
  return <section className='feedbacks-section'>
    <h2 className="feedbacks-heading">Все еще сомневаетесь? Спросите у других</h2>
    <p className="feedbacks-title">Многие уже сделали выбор в пользу Haya Brows, и ни разу не пожалели об этом.<br />Так чего же вы ждете?</p>
    <div className="feedbacks-list">
      {list.map((f, i) => <FeedbackCard key={i} {...f} />)}
      <Link to='booking' className='feedbacks-booking'>Записаться</Link>
    </div>
  </section>;
}

export default Section;
