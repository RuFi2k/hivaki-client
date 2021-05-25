import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '..';
import socials from '../sections/Social/list';
import './style.css';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return <footer className='footer-section'>
    <div className="footer-main">
      <Link to='/' className="footer-logo">
        <Logo />
      </Link>
      <div className="footer-row">
        <Link to='booking' className='footer-link'>Запись</Link>
        <a href='#' className='footer-link'>Администрирование</a>
        {socials.map((s, i) => <a className='footer-link' key={i} target='__blank' href={s.link}>{s.text}</a>)}
      </div>
      <div className="footer-row">
        <p className="footer-contacts">
          г. Нижний Новгород<br/>
          Сормовский р-н<br />
          ул. Белозерская, 3<br />
          <a className='footer-link' href='tel:79535728118'>+7 (953)-572-81-18</a><br />
        </p>
      </div>
    </div>
    <div className="footer-copy">
      &copy; Website made by <a className='footer-git' target="__blank" href='https://github.com/RuFi2k'>RuFi</a>. {year}
    </div>
  </footer>
}

export default Footer;
