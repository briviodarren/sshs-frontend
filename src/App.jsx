import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import AnnouncementPage from './pages/AnnouncementPage';

const ProtectedLayout = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Routes>
      <Route 
        path="/" 
        // --- CHANGE IS HERE ---
        element={!user ? <LoginPage /> : <Navigate to="/announcements" />} 
      />
      
      <Route element={<ProtectedLayout />}>
        <Route path="/announcements" element={<AnnouncementPage />} />
        {/* All other protected pages will go here */}
      </Route>

      {/* The old /dashboard route has been removed */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;