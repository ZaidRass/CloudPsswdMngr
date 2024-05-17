import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './views/home'; // Ensure that the component names match the file names
import Profile from './views/Profile';
import ChangeUserEmail from './views/ChangeUserEmail';
import ChangeUserUsername from './views/ChangeUserUsername';
import ChangeUserPassword from './views/ChangeUserPassword';
import LandingPage from './views/LandingPage';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} /> {}
          <Route path = "/profile/ChangeUserEmail" element = {<ChangeUserEmail />} />
          <Route path = "/profile/ChangeUserUsername" element = {<ChangeUserUsername />} />
          <Route path = "/profile/ChangeUserPassword" element = {<ChangeUserPassword />} />
        </Routes>
      </Router>
    </NextUIProvider>
  </React.StrictMode>
)