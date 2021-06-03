import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn}) => {

  if (isSignedIn) {
    return (
      <nav className='but pa3 link' style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <p onClick={() => onRouteChange('signout')} className='f4 grow link dim black b ba  hover-bg-white pa2 pointer'>Sign Out</p>
      </nav>
    );

  } else {
    return (
      <nav style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
        <p onClick={() => onRouteChange('signin')} className='f4 grow link dim black b ba  hover-bg-white pa2 pointer'>Sign In</p>
        <p onClick={() => onRouteChange('register')} className='f4 grow link dim black b ba  hover-bg-white pa2 pointer'>Register</p>
      </nav>
    );
  }
}

export default Navigation;
