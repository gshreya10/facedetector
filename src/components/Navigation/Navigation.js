import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn}) => {

  if (isSignedIn) {
    return (
      <nav className='but pa2 link' style={{ display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => onRouteChange('signout')} className='f6 grow link white b ba hover-bg-black pa2 pointer'>Sign Out</p>
      </nav>
    );

  } else {
    return (
      <nav className='but pa2 link' style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => onRouteChange('signin')} className='f6 grow link white b ba hover-bg-black pa2 pointer'>Sign In</p>
        <p onClick={() => onRouteChange('register')} className='f6 grow link white b ba hover-bg-black pa2 pointer'>Register</p>
      </nav>
    );
  }
}

export default Navigation;
