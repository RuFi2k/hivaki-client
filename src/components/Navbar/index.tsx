import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import './style.css';
import { Logo } from '..';

const Component: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrolled(!!window.scrollY);
    })
  }, []);

  return <nav className={clsx('navbar', scrolled && 'navbar-scrolled')}>
    <div className="navbar-logo">
      <Logo />
    </div>
  </nav>
}

export default Component;
