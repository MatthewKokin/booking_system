// Entry point of the React application.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Enables routing
import App from './App.tsx';
import './index.css'; // Global stylings

// Get the root element from the HTML file
const rootElement = document.getElementById('root');

// Initialise and render the React application
createRoot(rootElement!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
