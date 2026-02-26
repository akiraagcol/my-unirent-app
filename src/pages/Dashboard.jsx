import React from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard"; // Import reusable component [cite: 75]
import LockerItem from "../components/LockerItem"; // Import second component
import "../styles/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "TOTAL", count: 11, color: "total-card" },
    { label: "AVAILABLE", count: 7, color: "available-card" },
    { label: "OCCUPIED", count: 4, color: "occupied-card" },
    { label: "MAINTENANCE", count: 2, color: "maintenance-card" },
  ];

  const lockers = [
    { id: "A1", status: "Available" },
    { id: "A2", status: "Occupied" },
    { id: "A3", status: "Occupied" },
    { id: "B3", status: "Maintenance" },
    { id: "C1", status: "Maintenance" },
    { id: "C2", status: "Available" },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button className="back-home-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
        <div className="header-main-row">
          <h1 className="dashboard-title">UniRent Dashboard</h1>
          <div className="header-icons-group">
            <button className="icon-btn" title="Rentals" onClick={() => navigate("/rentals")}>🛒</button>
            <button className="icon-btn">🔔</button>
            <button className="icon-btn profile-circle">👤</button>
          </div>
        </div>
      </header>

      {/* Grid Layout handles alignment and spacing [cite: 94, 25] */}
      <div className="stats-grid">
        {stats.map((item, index) => (
          <StatCard 
            key={index} 
            label={item.label} 
            count={item.count} 
            colorClass={item.color} 
          />
        ))}
      </div>

      <div className="dashboard-main-content">
        <div className="section-card locker-section">
          <h3 className="section-heading">Locker Status</h3>
          <div className="locker-grid">
            {/* Rendering a list from an array [cite: 112] */}
            {lockers.map((locker) => (
              <LockerItem 
                key={locker.id} 
                id={locker.id} 
                status={locker.status} 
              />
            ))}
          </div>
        </div>

        <div className="section-card activity-section">
          <h3 className="section-heading">Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-time">10:30 AM</span>
              <span className="activity-desc">Arduino Uno rented by Francis B.</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">09:15 AM</span>
              <span className="activity-desc">Locker A1 unlocked by admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}