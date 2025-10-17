import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import AnnouncementPage from './pages/AnnouncementPage';

// Accept user and setUser to pass them down
const ProtectedLayout = ({ user, setUser }) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  // Pass the props to the main Layout component
  return (
    <Layout user={user} setUser={setUser}>
      <Outlet />
    </Layout>
  );
};

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <Routes>
      <Route 
        path="/" 
        element={!user ? <LoginPage setUser={setUser} /> : <Navigate to="/announcements" />} 
      />
      
      {/* Pass user and setUser to the protected routes */}
      <Route element={<ProtectedLayout user={user} setUser={setUser} />}>
        <Route path="/announcements" element={<AnnouncementPage />} />
        {/* All other protected pages will go here */}
      </Route>

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;