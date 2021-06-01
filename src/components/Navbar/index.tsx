import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import './style.css';
import { AnchorLink, Logo } from '..';
import { Link } from 'react-router-dom';
import { IMenu } from './menus';

type Props = {
  menu: IMenu[],
  black?: boolean,
}

const Component: React.FC<Props> = ({ menu, black }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrolled(!!window.scrollY);
    })
  }, []);

  return <nav className={clsx('navbar', (scrolled || black) && 'navbar-scrolled')}>
    <Link to='/' className="navbar-logo">
      <Logo />
    </Link>
    <ul className='navbar-navigation'>
      {menu.map((item, id) => (
        <li key={id}>
          {item.anchor
            ? <AnchorLink className='navbar-link' href={item.link}>{item.title}</AnchorLink>
            : <Link className='navbar-link' to={item.link}>{item.title}</Link>}
        </li>
      ))}
    </ul>
  </nav>
}

export default Component;
