import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import './style.css';
import { Logo } from '..';
import { Link } from 'react-router-dom';

const Component: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrolled(!!window.scrollY);
    })
  }, []);

  return <nav className={clsx('navbar', scrolled && 'navbar-scrolled')}>
    <Link to='/' className="navbar-logo">
      <Logo />
    </Link>
    <ul className='navbar-navigation'>
      <li><Link className='navbar-link' to='booking'>Запись</Link></li>
      <li><a className='navbar-link' href="#services">Услуги</a></li>
      <li><a className='navbar-link' href="#findus">Где искать</a></li>
      <li><a className='navbar-link' href="#qualities">Качества</a></li>
      <li><a className='navbar-link' href="#social">Медиа</a></li>
    </ul>
  </nav>
}

export default Component;
