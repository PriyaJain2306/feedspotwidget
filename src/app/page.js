'use client';
import React, { useState, useEffect } from 'react';
import Login from './components/Login'; // Make sure this path is correct
import WidgetBuilder from './WidgetBuilder'; // Your actual main content (see below)

export default function HomeWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setIsLoggedIn(false);
  };

  return isLoggedIn ? <WidgetBuilder onLogout={handleLogout} /> : <Login onLogin={handleLogin} />;
}
