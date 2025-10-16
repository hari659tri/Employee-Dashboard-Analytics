import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to list if already logged in
    if (localStorage.getItem('loggedIn') === '1') {
      navigate('/list', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'testuser' && password === 'Test123') {
      localStorage.setItem('loggedIn', '1'); // persist login
      navigate('/list', { replace: true });
    } else {
      setError('Invalid credentials — use username: testuser and password: Test123');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #34443eff 0%, #33313fff 100%)',
        padding: 16,
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: 32,
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: 420,
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: 24, color: '#111' }}>Welcome Back</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: 14, color: '#6b7280' }}>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="testuser"
              style={{
                width: '100%',
                padding: 10,
                marginTop: 6,
                borderRadius: 8,
                border: '1px solid #d1d5db',
              }}
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: 14, color: '#6b7280' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Test123"
              style={{
                width: '100%',
                padding: 10,
                marginTop: 6,
                borderRadius: 8,
                border: '1px solid #d1d5db',
              }}
            />
          </div>

          {error && <div style={{ color: 'crimson', fontSize: 13 }}>{error}</div>}

          <button
            type="submit"
            style={{
              padding: 12,
              borderRadius: 10,
              border: 'none',
              background: '#2563eb',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: 16, fontSize: 13, color: '#6b7280' }}>
          Note: For demo use username <strong>testuser</strong> and password <strong>Test123</strong>.
        </p>
      </div>
    </div>
  );
}
