import React from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const onLogout = () => {
        authService.logout();
        navigate('/');
        window.location.reload();
    };

    return (
        <div>
            <h1>Welcome, {user?.full_name} ({user?.role})</h1>
            <button onClick={onLogout}>Logout</button>
            <p>Your dashboard will be here.</p>
        </div>
    );
};

export default Dashboard;