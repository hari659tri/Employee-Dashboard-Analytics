import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedIn'); // clear only login info
    navigate('/', { replace: true }); // redirect to login
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '8px 16px',
        borderRadius: 8,
        border: 'none',
        background: '#ef4444',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: 600,
        transition: '0.2s',
        position: 'relative',
        right: '-70em', 
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.8)}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
    >
      Logout
    </button>
  );
}
