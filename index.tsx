import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("Lifequiver Schools Portal: Initializing Application...");

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Lifequiver Schools Portal: Application mounted successfully.");
  } catch (err) {
    console.error("Lifequiver Schools Portal: Critical failure during mounting:", err);
  }
} else {
  console.error("Lifequiver Schools Portal: Could not find root element '#root'. Ensure index.html contains <div id='root'></div>");
}