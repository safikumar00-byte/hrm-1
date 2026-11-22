import React, { useEffect, useState } from 'react';
import './AppPreloader.css';

/**
 * Minimal + Creative + Lightweight Preloader for CVM-HRMS
 * Displayed exclusively on initial app bootstrap or auth restoration.
 * Respects prefers-reduced-motion.
 */
export default function AppPreloader({ loading, message = 'Initializing enterprise workspace...' }) {
  const [visible, setVisible] = useState(loading);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setFading(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 400); // 400ms smooth fade-out
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
      setFading(false);
    }
  }, [loading]);

  if (!visible) return null;

  return (
    <div
      className={`app-preloader-backdrop ${fading ? 'fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Application loading"
    >
      <div className="app-preloader-card">
        <div className="app-preloader-logo-wrapper">
          <div className="app-preloader-logo-glow" />
          <div className="app-preloader-logo-badge">
            C
          </div>
        </div>

        <div className="app-preloader-brand-title">
          <h1>
            CVM HRMS <span className="lime">V1</span>
          </h1>
          <p className="app-preloader-status">{message}</p>
        </div>

        <div className="app-preloader-track">
          <div className="app-preloader-bar" />
        </div>
      </div>
    </div>
  );
}
