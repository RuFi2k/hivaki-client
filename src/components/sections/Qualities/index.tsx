import React from 'react';
import { QualityCard } from '../..';
import qualities from './list';
import './style.css';

const Section: React.FC = () => {
  return <section className='qualities-section'>
    <span className='anchor' id='qualities'>anchor</span>
    <h2 className='qualities-header'>Клиент получает только лучшее</h2>
    <div className="qualities-list">
      {qualities.map(({ title, icon ,description }, i) => (
        <QualityCard
          key={i}
          title={title}
          icon={icon}
          description={description}
        />
      ))}
    </div>
  </section>
}

export default Section;
