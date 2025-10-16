import React from 'react';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="w-full bg-white shadow-sm p-4 flex justify-end items-center">
      <div className="flex items-center">
        <span className="text-gray-700 font-semibold mr-4">Welcome, {user?.full_name}</span>
        {/* You can add a profile picture or dropdown menu here later */}
      </div>
    </header>
  );
};

export default Header;