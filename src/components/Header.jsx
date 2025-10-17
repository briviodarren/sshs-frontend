import React from 'react';

// Accept user as a prop
const Header = ({ user }) => {
  return (
    <header className="w-full bg-white shadow-sm p-4 flex justify-end items-center">
      <div className="flex items-center">
        {/* Use the user prop for the name */}
        <span className="text-gray-700 font-semibold mr-4">Welcome, {user?.full_name}</span>
      </div>
    </header>
  );
};

export default Header;