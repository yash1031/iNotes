// src/components/GoogleLogin.js
import React, { useEffect, useRef } from 'react';

const GoogleLogin = ({ onSuccess, onFailure }) => {
  const googleButton = useRef(null);

  useEffect(() => {
    const loadGoogleScript = () => {
      console.log("In loadGoogleScript")
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
        console.log("In initializeGoogleSignIn")
      /* global google */
      google.accounts.id.initialize({
        client_id: '658666455943-ti8g9vb78c53pbcrdm2el1813hdi8f35.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(googleButton.current, {
        theme: 'outline',
        size: 'large',
      });
    };

    const handleCredentialResponse = (response) => {
        console.log("In handleCredentialResponse")
      const credential = response.credential;
      const user = JSON.parse(atob(credential.split('.')[1]));
      onSuccess(user);
      localStorage.setItem('googleCredential', credential); // Save the credential for logout
    };

    if (!window.google) {
      console.log("Window.google value is: "+ window.google)
      loadGoogleScript();
    } else {
      console.log("Window.google value is: "+ JSON.stringify(window.google))
      initializeGoogleSignIn();
    }
  }, [onSuccess, onFailure]);

  return <div ref={googleButton}></div>;
};

export default GoogleLogin;
