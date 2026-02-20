import React from 'react';

// Reusable component using props [cite: 14]
export default function LockerItem({ id, status }) {
  return (
    <div className="locker-item">
      <span className="locker-id">{id}</span>
      <span className="locker-status">{status}</span>
      {/* Interaction triggers a visible UI update via alert [cite: 35, 36] */}
      <button className="open-btn" onClick={() => alert(`Locker ${id} has been opened!`)}>
        Open
      </button>
    </div>
  );
}