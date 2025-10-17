import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import AnnouncementPage from './pages/AnnouncementPage';

// This component protects all inner pages and wraps them in the main layout
const ProtectedLayout = ({ user, setUser }) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <Layout user={user} setUser={setUser}>
      <Outlet />
    </Layout>
  );
};

function App() {
  // The user's login status is managed here for the whole app
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <Routes>
      <Route 
        path="/" 
        // If no user, show LoginPage. If a user IS logged in, redirect to announcements.
        element={!user ? <LoginPage setUser={setUser} /> : <Navigate to="/announcements" />} 
      />
      
      {/* All pages that require a login are nested inside here */}
      <Route element={<ProtectedLayout user={user} setUser={setUser} />}>
        <Route path="/announcements" element={<AnnouncementPage />} />
        {/* We will add /assignments, /grades, etc. here later */}
      </Route>

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;