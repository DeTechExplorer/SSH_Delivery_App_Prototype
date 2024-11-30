import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';  // Note the capital 'A'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);