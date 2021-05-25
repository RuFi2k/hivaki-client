import React from 'react';
import { PathIcon } from '../../icons';
import './style.css';

const Section: React.FC = () => {
  return <section className='findus-section'>
    <span className='anchor findus-anchor' id='findus'>anchor</span>
    <PathIcon className='findus-path' />
    <div className='findus-container'>
      <h2 className='findus-heading'>Где найти</h2>
      <p className="findus-text">
        г. Нижний Новгород<br/>
        Сормовский р-н<br />
        ул. Белозерская, 3<br />
        <a className='findus-phone' href='tel:79535728118'>+7 (953)-572-81-18</a><br />
      </p>
    </div>
  </section>
}

export default Section;
