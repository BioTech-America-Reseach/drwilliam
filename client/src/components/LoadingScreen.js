import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="connection-icon">
          <div className="pad-icon"></div>
          <div className="pulse-ring"></div>
          <div className="pulse-ring"></div>
        </div>
        
        <h2>Connecting Sensor Pads</h2>
        <p>Initializing ELECT-RO 30PRO BODY TEST System</p>
        
        <div className="status-messages">
          <div className="status-item"><span className="status-dot"></span><span>System Boot: Loading...</span></div>
          <div className="status-item"><span className="status-dot"></span><span>Sensor Pads: Connecting...</span></div>
          <div className="status-item"><span className="status-dot"></span><span>Database: Synchronizing...</span></div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${Math.min(progress, 100)}%` }}></div>
        </div>
        
        <div className="progress-text">{Math.floor(Math.min(progress, 100))}%</div>
        <p className="loading-hint">Please ensure sensor pads are connected to patient</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
