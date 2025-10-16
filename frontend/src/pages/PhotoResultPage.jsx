// src/pages/PhotoResultPage.jsx
import React, { useRef, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';

// Reusable Button with hover/active effects
const Button = ({ children, onClick, variant = 'primary', style = {} }) => {
  const baseStyle = {
    padding: '10px 18px',
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    transition: 'all 0.2s',
    ...style,
  };
  const styles = {
    primary: { ...baseStyle, background: '#2563eb', color: '#fff' },
    ghost: { ...baseStyle, background: '#f3f4f6', color: '#111' },
    danger: { ...baseStyle, background: '#ef4444', color: '#fff' },
  };
  return (
    <button
      onClick={onClick}
      style={styles[variant]}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.85)}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {children}
    </button>
  );
};

export default function PhotoResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item ?? null;

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const videoConstraints = { width: 640, height: 480, facingMode: 'user' };

  const capture = useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, []);

  const downloadImage = () => {
    if (!imgSrc) return;
    const link = document.createElement('a');
    link.href = imgSrc;
    link.download = `${item?.name ?? 'photo'}.jpg`;
    link.click();
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: 'auto',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#111' }}>
        Capture Photo {item ? `for ${item.name ?? item.employee_name ?? ''}` : ''}
      </h2>

      {imgSrc ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 640,
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 6px 18px rgba(20,20,40,0.1)',
            }}
          >
            <img
              src={imgSrc}
              alt="captured"
              style={{ width: '100%', display: 'block' }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Button variant="primary" onClick={downloadImage}>
              Download
            </Button>
            <Button variant="ghost" onClick={() => setImgSrc(null)}>
              Retake
            </Button>
            <Button variant="ghost" onClick={() => navigate('/list')}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={{
              width: '100%',
              maxWidth: 640,
              borderRadius: 12,
              boxShadow: '0 6px 18px rgba(20,20,40,0.1)',
            }}
          />
          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Button variant="primary" onClick={capture}>
              Take Photo
            </Button>
            <Button variant="ghost" onClick={() => navigate('/list')}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
