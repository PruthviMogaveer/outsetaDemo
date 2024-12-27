import { useEffect } from 'react';

declare global {
  interface Window {
    Outseta: any;
  }
}

export const OutsetaAuth = () => {
  useEffect(() => {
    // Initialize Outseta
    const initOutseta = () => {
      if (window.Outseta) {
        window.Outseta.init({
          domain: 'search-assistant.outseta.com'
        });
      }
    };

    // Load Outseta script
    const script = document.createElement('script');
    script.src = 'https://cdn.outseta.com/outseta.min.js';
    script.async = true;
    script.onload = initOutseta;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="login-embed" data-widget-mode="login"></div>;
};
