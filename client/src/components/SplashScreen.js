import React, { useEffect } from 'react';
import './SplashScreen.css';

function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="splash-title animate-glow">ELECT-RO</div>
        <div className="splash-subtitle animate-pulse">30PRO BODY TEST</div>
        <div className="splash-description">Advanced Medical Diagnosis System</div>
        <div className="clinic-name">Dr. William Clinic</div>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
