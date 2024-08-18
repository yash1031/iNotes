// src/components/GoogleLogout.js
import React from 'react';

const GoogleLogout = ({ onLogout }) => {
  const handleLogout = () => {
    const credential = localStorage.getItem('googleCredential');
    if (credential) {
      fetch(`https://accounts.google.com/o/oauth2/revoke?token=${credential}`, {
        method: 'GET',
        // headers: {
        //   'Content-type': 'application/x-www-form-urlencoded'
        // }
      })
        .then(response => {
          if (response.ok) {
            console.log('Logout successful');
            localStorage.removeItem('googleCredential');
            onLogout();
          } else {
            console.log('Logout failed');
          }
        });

    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default GoogleLogout;
