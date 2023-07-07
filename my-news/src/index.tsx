import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import "./fonts/Inter Web/inter.css"
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);