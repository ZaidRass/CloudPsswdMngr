import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/home'; // Ensure that the component names match the file names
import Login from './views/login'; // Ensure that the component names match the file names

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Use element prop with JSX element */}
          <Route path="/home" element={<Home />} /> {/* Use element prop with JSX element */}
        </Routes>
      </Router>
    </NextUIProvider>
  </React.StrictMode>
);
