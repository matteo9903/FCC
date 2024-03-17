import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// viene indicato che componente React è iniettata all'interno della
// root del dcoumento HTML (nel DOM)

// App è componente madre e inietterà tutte le altre quando richiamata