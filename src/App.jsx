import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard'; // You will need to re-create this placeholder file

function App() {
  // Checks for user in localStorage to determine login status
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/" />} 
        />
        {/* All other protected routes like /announcements will be added later */}
      </Routes>
    </>
  );
}

export default App;