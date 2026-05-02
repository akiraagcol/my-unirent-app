import React, { useState, useEffect } from "react"; // Added useEffect for Lab 9 Task 3
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard"; 
import LockerItem from "../components/LockerItem"; 
import "../styles/Dashboard.css";
import "../styles/Notifications.css"; 

export default function Dashboard({ cartCount, notifications }) {
  const navigate = useNavigate();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  // Task 3: State to store real database data[cite: 2]
  const [lockers, setLockers] = useState([]);

  const addItem = () => {
    const newItem = {
      id: "D1", // Example ID
      status: "Available"
    };
  
    fetch("http://127.0.0.1:8000/api/items/", {
      method: "POST", // The method for creating data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem), // Converts your JS object to JSON strings[cite: 2]
    })
    .then(res => res.json())
    .then(data => {
      console.log("Success:", data);
      // Refresh the list so the new item shows up[cite: 2]
      window.location.reload(); 
    })
    .catch(err => console.error("Error adding item:", err));
  };

  // Task 3: Fetching data from your Django REST API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/items/") // Replace with your actual endpoint from Lab 8
      .then((res) => res.json())
      .then((data) => {
        setLockers(data); // Injects real data into the UI[cite: 2]
      })
      .catch((err) => console.error("Data flow error:", err));
  }, []);

  const stats = [
    { label: "TOTAL", count: 11, color: "total-card" },
    { label: "AVAILABLE", count: 7, color: "available-card" },
    { label: "OCCUPIED", count: 4, color: "occupied-card" },
    { label: "MAINTENANCE", count: 2, color: "maintenance-card" },
  ];

  /* Static lockers array removed to satisfy Task 7: "Interact with database only through API"[cite: 2] */

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-main-row">
          <h1 className="dashboard-title">UniRent Dashboard</h1>
          
          <div className="header-actions-container">
            <button 
              type="button" 
              className="primary-rent-btn" 
              onClick={() => navigate("/rentals")}
            >
               Browse Marketplace
            </button>
            
            <button 
              type="button" 
              className="secondary-cart-btn"
              onClick={() => navigate("/cart")}
            >
              🛒 Cart <span className="cart-count-badge">{cartCount || 0}</span>
            </button>

            <div className="header-icons-group">
              <div className="notif-icon-wrapper" style={{ position: 'relative' }}>
                <button 
                  type="button" 
                  className="icon-btn" 
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                >
                  🔔 <span className="notif-dot"></span>
                </button>

                {isNotifOpen && (
                  <div className="notif-dropdown">
                    <div className="notif-header">
                      <h3>Notifications</h3>
                    </div>
                    <div className="notif-list">
                      {notifications && notifications.map((n) => (
                        <div 
                          key={n.id} 
                          className="notif-item" 
                          onClick={() => { navigate(n.link); setIsNotifOpen(false); }}
                        >
                          <div className="notif-avatar">
                            {n.type === 'post' ? '📦' : n.type === 'locker' ? '🔒' : '📥'}
                          </div>
                          <div className="notif-info">
                            <p className="notif-text">{n.text}</p>
                            <span className="notif-time">{n.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button 
                type="button" 
                className="icon-btn profile-circle" 
                onClick={() => navigate("/profile")}
              >
                👤
              </button>
            </div>
          </div>
        </div>
      </header>

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
            {/* Task 7: Display updated data retrieved from API[cite: 1] */}
            {lockers.length === 0 ? <p>Loading system data...</p> : 
              lockers.map((locker) => (
                <LockerItem 
                  key={locker.id} 
                  id={locker.id} 
                  status={locker.status} 
                />
              ))
            }
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