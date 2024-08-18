// src/components/GoogleOAuth.js
import React, { useEffect } from 'react';

const GoogleOAuth = ({ onSuccess, onFailure }) => {
  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id: '658666455943-ti8g9vb78c53pbcrdm2el1813hdi8f35.apps.googleusercontent.com', // Replace with your actual client ID
          scope: 'profile email',
        });

        const element = document.getElementById('google-signin-button');
        auth2.attachClickHandler(element, {},
          (googleUser) => {
            const profile = googleUser.getBasicProfile();
            const user = {
              id: profile.getId(),
              name: profile.getName(),
              email: profile.getEmail(),
              imageUrl: profile.getImageUrl(),
            };
            onSuccess(user);
          },
          (error) => {
            onFailure(error);
          }
        );
      });
    };

    if (!window.gapi) {
      loadGoogleScript();
    } else {
      initializeGoogleSignIn();
    }
  }, [onSuccess, onFailure]);

  return <div id="google-signin-button" className="customGPlusSignIn"></div>;
};

export default GoogleOAuth;
