import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Component: React.FC = () => {
  return <section className='empty-section'>
    <FontAwesomeIcon icon={faCalendarAlt} className='empty-icon' />
    <p className="empty-text">Пока что нету доступных слотов.<br />Повторите попытку позже</p>
    <Link to='/' className='empty-link'>На главную</Link>
  </section>
}

export default Component;
