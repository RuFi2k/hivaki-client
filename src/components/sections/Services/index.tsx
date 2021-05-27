import React from 'react';
import { ServiceCard } from '../..';
import services from './services';
import './style.css';

const Section: React.FC = () => {
  return <section className='services-section'>
    <span className='anchor' id='services'>anchor</span>
    <h2 className='services-heading'>Услуги</h2>
    <p className="services-text">
      Я каждый день изучаю что-то новое в своей профессии, чтобы расширить спектр возможностей.<br />
      Вот что умею на даный момент
    </p>
    <div className="services-list">
      {services.map((s, id) => <ServiceCard key={id} {...s} />)}
    </div>
  </section>
}

export default Section;
