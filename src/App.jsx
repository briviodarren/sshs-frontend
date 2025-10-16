import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import AnnouncementPage from './pages/AnnouncementPage';
// We will create the other pages as we build them.

// This component protects routes and wraps them in the main layout.
const ProtectedLayout = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <Outlet /> {/* This will render the matched child route component */}
    </Layout>
  );
};

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Routes>
      <Route 
        path="/" 
        element={!user ? <LoginPage /> : <Navigate to="/announcements" />} 
      />
      
      {/* All routes inside here will have the sidebar and header */}
      <Route element={<ProtectedLayout />}>
        <Route path="/announcements" element={<AnnouncementPage />} />
        {/* Add routes for all other pages here later. For example:
          <Route path="/assignments" element={<AssignmentPage />} />
          <Route path="/grades" element={<GradesPage />} />
        */}
      </Route>

      {/* Optional: A catch-all route for 404 pages */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;