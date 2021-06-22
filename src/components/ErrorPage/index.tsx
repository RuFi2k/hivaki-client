import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './style.css'

const Component: React.FC = () => {
  return <section className='errorpage-section'>
    <FontAwesomeIcon className='errorpage-icon' icon={faExclamationTriangle} />
    <h2>Произошла ошибка</h2>
    <p>Повторите попытку позже</p>
  </section>
}

export default Component;
