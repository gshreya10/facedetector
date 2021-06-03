import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
  return (
  // Logo
  <div className='ma4 mt0'>
    <Tilt className="Tilt br1 shadow-1" options={{ max: 50 }} style={{
        height: 100,
        width: 100
      }}>
      <div className="Tilt-inner pa1">
        <img alt='Logo' src={logo}/>
      </div>
    </Tilt>
  </div>);
}

export default Logo;
