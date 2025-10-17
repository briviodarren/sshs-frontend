import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { 
  FaBullhorn, FaTasks, FaBook, FaGraduationCap, 
  FaFileAlt, FaUserEdit, FaSignOutAlt, FaDollarSign, FaFileSignature, 
  FaExclamationTriangle, FaComments, FaClipboardList 
} from 'react-icons/fa';

const navLinks = { /* ... This object remains unchanged ... */ };

// Accept user and setUser as props
const Sidebar = ({ user, setUser }) => {
  const navigate = useNavigate();
  // Use the user prop for the role
  const role = user?.role;
  
  const links = navLinks[role] || [];

  const onLogout = () => {
    authService.logout(); // Clears localStorage
    setUser(null);      // Clears the app state
    navigate('/');      // Navigates to the login page
  };

  return (
    <div className="flex flex-col h-full w-64 bg-gray-800 text-gray-100">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-white">SSHS Portal</h1>
        <p className="text-sm text-gray-400 capitalize">{role} Dashboard</p>
      </div>
      <nav className="flex-grow px-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mt-2 rounded-lg transition-colors duration-200 hover:bg-gray-700 hover:text-white ${
                isActive ? 'bg-gray-900 text-white' : 'text-gray-400'
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            <span className="mx-4 font-medium">{link.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="px-4 pb-4">
         <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 mt-2 text-gray-400 rounded-lg transition-colors duration-200 hover:bg-gray-700 hover:text-white"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="mx-4 font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;