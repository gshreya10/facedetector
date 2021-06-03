import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
  return (
  // Logo
  <div className='ma4 mt0'>
    <Tilt className="Tilt br1 shadow-1" options={{ max: 20 }} style={{
        height: 50,
        width: 50
      }}>
      <div className="Tilt-inner pa1">
        <img alt='Logo' src={logo}/>
        <p className='white'>Face Detection</p>
      </div>
    </Tilt>
  </div>);
}

export default Logo;
