import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import './style.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrolled(!!window.scrollY);
    })
  }, []);

  return <nav className={clsx('navbar', scrolled && 'navbar-scrolled')}>navbar</nav>
}

export default Navbar;
