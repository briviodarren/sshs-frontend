import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

// Accept user and setUser props
const Layout = ({ children, user, setUser }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Pass the props down to Sidebar */}
      <Sidebar user={user} setUser={setUser} />
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Pass the props down to Header */}
        <Header user={user} />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;