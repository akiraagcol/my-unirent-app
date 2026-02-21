import React from 'react';

// This component uses props to be reusable [cite: 71, 72]
export default function StatCard({ label, count, colorClass }) {
  return (
    <div className={`stat-card ${colorClass}`}>
      <span className="stat-label">{label}</span>
      <span className="stat-count">{count}</span>
    </div>
  );
}