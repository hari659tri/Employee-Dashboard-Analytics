// src/pages/ListPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

// Styles
const cardStyle = {
  background: '#fff',
  padding: 16,
  borderRadius: 12,
  boxShadow: '0 6px 18px rgba(20,20,40,0.06)',
  transition: '0.2s',
};
const btnBase = {
  padding: '10px 18px',
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
  transition: '0.2s',
};
const primary = { ...btnBase, background: '#2563eb', color: '#fff' };
const ghost = { ...btnBase, background: '#f3f4f6', color: '#111' };

export default function ListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const resp = await fetch(
          "https://employee-backend-ht2p.onrender.com/api/gettabledata.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: "test", password: "123456" }),
          }
        );

        const js = await resp.json();
        const arr = js?.TABLE_DATA?.data ?? [];

        // Map array rows → employee objects
        const formatted = arr.map((item) => ({
          name: item[0],
          position: item[1],
          city: item[2],
          salary: Number(item[5]?.replace(/[^0-9.-]+/g, '') || 0),
          id: item[3],
        }));

        // 🔹 Shuffle employee data every time page reloads
        const shuffled = formatted.sort(() => Math.random() - 0.5);

        // Optional: limit list to 20 random employees for variety
        setData(shuffled.slice(0, 20));
      } catch (err) {
        console.error(err);
        setError('Failed to load data from API');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const openDetails = (item, idx) => {
    navigate(`/details/${item.id ?? idx}`, { state: { item } });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#f0f4f8',
      }}
    >
      <div style={{ width: '100%', maxWidth: 900 }}>
        <h2 style={{ marginBottom: 16, textAlign: 'center', color: '#111' }}>
          Employee List (Randomized)
        </h2>
        <LogoutButton />

        {/* Top Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 20,
            flexWrap: 'wrap',
          }}
        >
          <button
            style={primary}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.9)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
            onClick={() => navigate('/chart')}
          >
            Bar Graph (Salaries)
          </button>

          <button
            style={ghost}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.8)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div style={{ textAlign: 'center', color: '#6b7280' }}>
            Loading data...
          </div>
        )}
        {error && (
          <div style={{ textAlign: 'center', color: 'crimson' }}>{error}</div>
        )}

        {/* Employee Cards */}
        {!loading && !error && (
          <div
            style={{
              display: 'grid',
              gap: 16,
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            }}
          >
            {data.length === 0 && (
              <div style={{ textAlign: 'center' }}>No items to show.</div>
            )}

            {data.map((item, idx) => (
              <div
                key={item.id ?? idx}
                style={cardStyle}
                onClick={() => openDetails(item, idx)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = 'translateY(-4px)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'translateY(0)')
                }
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>
                      {item.name}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: 13 }}>
                      {item.city}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, color: '#374151' }}>
                      Salary: ${item.salary.toLocaleString()}
                    </div>
                    <div style={{ fontSize: 12, color: '#9ca3af' }}>
                      Click for details
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
