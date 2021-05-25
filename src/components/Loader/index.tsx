import React from 'react';
import { Logo } from '..';
import './style.css';

const Component: React.FC = () => {
  return <div className="loader">
    <Logo />
    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
}

export default Component;
