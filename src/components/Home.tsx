import React, { FC, useState, useEffect, EffectCallback } from 'react';
import '../styles/Home.scss';
import { Link, Redirect } from 'react-router-dom';

const Home: FC = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const res = await fetch(
        'http://localhost:5000/auth/checkauthentication',
        {
          credentials: 'include',
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      setIsLoggedin(res.ok);
    };
    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    const res = await fetch('http://localhost:5000/auth/logout', {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      setIsLoggedin(false);
    }
  };

  return (
    <div className='home-container'>
      <div className='home-banner'>
        <div className='home-banner-header'>
          {isLoggedin ? (
            <button className='home-logout-link' onClick={handleLogout}>
              log out
            </button>
          ) : (
            <Link to='/login' className='home-login-link'>
              log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
