import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import Login from './components/Login';
import MainLayout from './MainLayout';
import Register from './components/Register';
import HomePage from './components/HomePage';
import UserLayout from './UserLayout';
import UserHome from './components/UserHome';
import Profile from './components/Profile';
import { AppearanceContextProvider } from './AppearanceContext'; // Updated import

import './App.css';

function App() {
  return (
    <AppearanceContextProvider>
      <Router>
        <Routes>
            <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
            <Route path = "/UserHome" element = {<UserLayout><UserHome /></UserLayout>} />
            <Route path = "/Profile" element = {<UserLayout><Profile /></UserLayout>} />

        </Routes>
      </Router>
    </AppearanceContextProvider>
  );
}

export default App;
