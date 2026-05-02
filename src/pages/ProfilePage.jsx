import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  
  // 1. Expand state to hold all the new real database values
  const [userData, setUserData] = useState({
    fullName: "Loading...",
    studentId: "Loading...",
    memberSince: "Loading...",
    trustScore: 0,
    rentals: 0,
    listings: 0,
    reviews: 0
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/"); 
      return;
    }

    fetch("http://192.168.5.95:8000/api/profile/", {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    })
    .then((data) => {
      // 2. Map the newly added backend data into your React state
      setUserData({
        fullName: data.full_name,
        studentId: data.username,
        memberSince: data.member_since,
        trustScore: data.trust_score,
        rentals: data.rentals_count,
        listings: data.listings_count,
        reviews: data.reviews_count
      });
    })
    .catch((err) => {
      console.error("Profile fetch error:", err);
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("uniRentCart");
    window.location.href = "/"
  };

  return (
    <div className="dashboard-bg">
      <header className="dashboard-nav">
        <div className="nav-container">
          <button type="button" className="minimal-back-btn" onClick={() => navigate("/dashboard")}>
            ← Back to Dashboard
          </button>
        </div>
      </header>

      <main className="profile-dashboard-container">
        <div className="dashboard-grid">
          
          <aside className="identity-sidebar">
            <section className="profile-summary-card">
              <div className="avatar-wrapper">
                <div className="avatar-main">👤</div>
                <div className="online-indicator"></div>
              </div>
              
              {/* Dynamic Name and ID */}
              <h2 className="user-fullname">{userData.fullName}</h2>
              <p className="user-student-id">ID: {userData.studentId}</p>
              
              <div className="badge-row">
                <span className="premium-pill">PREMIUM RENTER</span>
              </div>

              <hr className="divider-light" />

              <div className="identity-meta-list">
                <div className="meta-item">
                  <label>Member Since</label>
                  {/* Dynamic Date */}
                  <span>{userData.memberSince}</span>
                </div>
                <div className="meta-item">
                  <label>Verification</label>
                  <span className="status-verified">✓ Verified</span>
                </div>
                <div className="meta-item">
                  <label>Trust Score</label>
                  {/* Dynamic Trust Score */}
                  <span className="trust-score">{userData.trustScore}/100</span>
                </div>
              </div>

              <div className="sidebar-stats-grid">
                <div className="stat-unit">
                  {/* Dynamic Rentals */}
                  <span className="stat-value">{userData.rentals}</span>
                  <span className="stat-label">Rentals</span>
                </div>
                <div className="stat-unit">
                  {/* Dynamic Listings */}
                  <span className="stat-value">{userData.listings}</span>
                  <span className="stat-label">Listings</span>
                </div>
                <div className="stat-unit">
                  {/* Dynamic Reviews */}
                  <span className="stat-value">{userData.reviews}</span>
                  <span className="stat-label">Reviews</span>
                </div>
              </div>
            </section>
            
            <button type="button" className="btn-logout-minimal" onClick={handleLogout}>
              Log Out
            </button>
          </aside>

          <section className="actions-dashboard">
            <div className="compact-verify-banner">
              <div className="banner-content">
                <span className="shield-icon">🛡️</span>
                <div className="banner-text">
                  <h3>Increase your Trust Score</h3>
                  <p>Verify your account to access high-value IoT devices.</p>
                </div>
              </div>
              <button type="button" className="btn-verify-now">Verify Now</button>
            </div>

            <div className="dual-section-grid">
              <div className="dashboard-card">
                <h3 className="card-heading">My Activity</h3>
                <div className="menu-list">
                  <button type="button" className="menu-item-btn">
                    <span className="menu-label">📅 My Rentals</span>
                    <span className="menu-arrow">›</span>
                  </button>
                  <button type="button" className="menu-item-btn">
                    <span className="menu-label">📋 My Listings</span>
                    <span className="menu-arrow">›</span>
                  </button>
                  <button 
                    type="button" 
                    className="menu-item-btn" 
                    onClick={() => navigate("/messages")}
                  >
                    <span className="menu-label">💬 My Messages</span>
                    <span className="notif-badge">3</span>
                  </button>
                </div>
              </div>

              <div className="dashboard-card">
                <h3 className="card-heading">Account Management</h3>
                <div className="menu-list">
                  <button type="button" className="menu-item-btn">
                    <span className="menu-label">👤 Edit Profile</span>
                    <span className="menu-arrow">›</span>
                  </button>
                  <button type="button" className="menu-item-btn">
                    <span className="menu-label">⚙️ Settings</span>
                    <span className="menu-arrow">›</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}