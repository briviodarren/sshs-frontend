import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import AnnouncementPage from './pages/AnnouncementPage';

// This component protects all the inner pages
const ProtectedLayout = ({ user, setUser }) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  // It passes the user info down to the Layout (Sidebar/Header)
  return (
    <Layout user={user} setUser={setUser}>
      <Outlet />
    </Layout>
  );
};

function App() {
  // We manage the logged-in user here, getting the initial value from localStorage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <Routes>
      <Route 
        path="/" 
        // If no user, show LoginPage and give it the ability to set the user.
        // If there IS a user, redirect to announcements.
        element={!user ? <LoginPage setUser={setUser} /> : <Navigate to="/announcements" />} 
      />
      
      {/* All protected routes are nested here */}
      <Route element={<ProtectedLayout user={user} setUser={setUser} />}>
        <Route path="/announcements" element={<AnnouncementPage />} />
        {/* We will add /assignments, /grades, etc. here later */}
      </Route>

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;