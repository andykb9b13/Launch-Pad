import React from 'react';
import '../styles/progressBar.css';

const CircularProgressBar = ({ funding, fundingGoal }) => {
  const progress = Math.min((funding / fundingGoal) * 100, 100);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="circular-progress-bar">
      <svg className="progress-ring" width="140" height="140">
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#FF0066" />
            <stop offset="100%" stopColor="#FFAA00" />
          </linearGradient>
        </defs>
        <circle
          className="progress-ring__circle"
          strokeWidth="8"
          r={radius}
          cx={radius}
          cy={radius}
        />
        <circle
          className="progress-ring__bar"
          strokeWidth="8"
          r={radius}
          cx={radius}
          cy={radius}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <div className="progress-text">{`${progress.toFixed(2)}%`}</div>
    </div>
  );
};

export default CircularProgressBar;