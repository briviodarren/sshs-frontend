import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { 
  FaTachometerAlt, FaBullhorn, FaTasks, FaBook, FaGraduationCap, 
  FaFileAlt, FaUserEdit, FaSignOutAlt, FaDollarSign, FaFileSignature, 
  FaExclamationTriangle, FaComments, FaClipboardList 
} from 'react-icons/fa';

// Navigation links configuration
const navLinks = {
  teacher: [
    { path: '/announcements', icon: <FaBullhorn />, name: 'Announcement' },
    { path: '/assignments', icon: <FaTasks />, name: 'Assignment' },
    { path: '/attendance', icon: <FaClipboardList />, name: 'Attendance' },
    { path: '/materials', icon: <FaBook />, name: 'Materials' },
    { path: '/grades', icon: <FaGraduationCap />, name: 'Grades' },
    { path: '/permits', icon: <FaFileAlt />, name: 'Permit' },
    { path: '/profile', icon: <FaUserEdit />, name: 'Profile' },
  ],
  student: [
    { path: '/announcements', icon: <FaBullhorn />, name: 'Announcement' },
    { path: '/assignments', icon: <FaTasks />, name: 'Assignment' },
    { path: '/attendance', icon: <FaClipboardList />, name: 'Attendance' },
    { path: '/materials', icon: <FaBook />, name: 'Materials' },
    { path: '/grades', icon: <FaGraduationCap />, name: 'Grades' },
    { path: '/permits', icon: <FaFileAlt />, name: 'Permit' },
    { path: '/scholarship', icon: <FaDollarSign />, name: 'Scholarship Application' },
    { path: '/fee-relief', icon: <FaFileSignature />, name: 'Fee Relief Application' },
    { path: '/critique', icon: <FaComments />, name: 'Critique & Suggestions' },
    { path: '/penalties', icon: <FaExclamationTriangle />, name: 'Penalty' },
    { path: '/profile', icon: <FaUserEdit />, name: 'Profile' },
  ],
  admin: [
    { path: '/announcements', icon: <FaBullhorn />, name: 'Announcement' },
    { path: '/assignments', icon: <FaTasks />, name: 'Assignment' },
    { path: '/attendance', icon: <FaClipboardList />, name: 'Attendance' },
    { path: '/materials', icon: <FaBook />, name: 'Materials' },
    { path: '/grades', icon: <FaGraduationCap />, name: 'Grades' },
    { path: '/permits', icon: <FaFileAlt />, name: 'Permit' },
    { path: '/scholarship', icon: <FaDollarSign />, name: 'Scholarship Apps' },
    { path: '/fee-relief', icon: <FaFileSignature />, name: 'Fee Relief Apps' },
    { path: '/critique', icon: <FaComments />, name: 'Critique & Suggestions' },
    { path: '/penalties', icon: <FaExclamationTriangle />, name: 'Penalty' },
    { path: '/profile', icon: <FaUserEdit />, name: 'Manage Users' },
  ]
};

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;
  
  const links = navLinks[role] || [];

  const onLogout = () => {
    authService.logout();
    navigate('/');
    window.location.reload();
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