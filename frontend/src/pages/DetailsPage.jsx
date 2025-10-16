// src/pages/DetailsPage.jsx
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

// Reusable Card for displaying field info
const InfoCard = ({ title, value }) => (
  <div
    style={{
      background: '#f8fafc',
      padding: 16,
      borderRadius: 12,
      minWidth: 140,
      wordBreak: 'break-word',
      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
      transition: 'transform 0.2s',
    }}
  >
    <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>{title}</div>
    <div style={{ fontWeight: 600, fontSize: 14 }}>{value ?? '—'}</div>
  </div>
);

// Button component with hover effects
const Button = ({ children, onClick, variant = 'primary' }) => {
  const baseStyle = {
    padding: '10px 18px',
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    transition: 'all 0.2s',
  };

  const styles = {
    primary: { ...baseStyle, background: '#2563eb', color: '#fff' },
    ghost: { ...baseStyle, background: '#f3f4f6', color: '#111' },
  };

  return (
    <button
      onClick={onClick}
      style={styles[variant]}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.85)}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
    >
      {children}
    </button>
  );
};

export default function DetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item ?? null;

  if (!item)
    return (
      <div
        style={{
          padding: 16,
          maxWidth: 700,
          margin: 'auto',
          textAlign: 'center',
        }}
      >
        <h3>No item data found.</h3>
        <Button variant="ghost" onClick={() => navigate('/list')}>
          Back to List
        </Button>
      </div>
    );

  return (
    <div
      style={{
        maxWidth: 900,
        margin: 'auto',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: '#6b7280' }}>
        <Link
          to="/list"
          style={{
            textDecoration: 'none',
            color: '#2563eb',
            fontWeight: 500,
          }}
        >
          List
        </Link>{' '}
        &gt; Details
      </div>

      {/* Title */}
      <h2 style={{ marginBottom: 12, color: '#111' }}>
        {item.name ?? item.employee_name ?? 'Item Details'}
      </h2>

      {/* Grid of info cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 16,
        }}
      >
        {Object.keys(item).map((key) => (
          <InfoCard key={key} title={key} value={String(item[key])} />
        ))}
      </div>

      {/* Action buttons */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          marginTop: 24,
        }}
      >
        <Button
          variant="primary"
          onClick={() => navigate('/photo', { state: { item } })}
        >
          Capture Photo
        </Button>
        <Button variant="ghost" onClick={() => navigate('/list')}>
          Back to List
        </Button>
      </div>
    </div>
  );
}
