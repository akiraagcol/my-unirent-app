import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-bg">
      {/* SEMANTIC HEADER */}
      <header className="dashboard-nav">
        <div className="nav-container">
          <button type="button" className="minimal-back-btn" onClick={() => navigate("/dashboard")}>
            ← Back to Dashboard
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="profile-dashboard-container">
        <div className="dashboard-grid">
          
          {/* LEFT COLUMN: Identity Sidebar */}
          <aside className="identity-sidebar">
            <section className="profile-summary-card">
              <div className="avatar-wrapper">
                <div className="avatar-main">👤</div>
                <div className="online-indicator"></div>
              </div>
              <h2 className="user-fullname">Justin Nabunturan</h2>
              <p className="user-student-id">ID: 2019123456</p>
              <div className="badge-row">
                <span className="premium-pill">PREMIUM RENTER</span>
              </div>

              <hr className="divider-light" />

              <div className="identity-meta-list">
                <div className="meta-item">
                  <label>Member Since</label>
                  <span>January 2026</span>
                </div>
                <div className="meta-item">
                  <label>Verification</label>
                  <span className="status-verified">✓ Verified</span>
                </div>
                <div className="meta-item">
                  <label>Trust Score</label>
                  <span className="trust-score">98/100</span>
                </div>
              </div>

              <div className="sidebar-stats-grid">
                <div className="stat-unit">
                  <span className="stat-value">12</span>
                  <span className="stat-label">Rentals</span>
                </div>
                <div className="stat-unit">
                  <span className="stat-value">4</span>
                  <span className="stat-label">Listings</span>
                </div>
                <div className="stat-unit">
                  <span className="stat-value">25</span>
                  <span className="stat-label">Reviews</span>
                </div>
              </div>
            </section>
            
            <button type="button" className="btn-logout-minimal" onClick={() => navigate("/")}>
              Log Out
            </button>
          </aside>

          {/* RIGHT COLUMN: Action Dashboard */}
          <section className="actions-dashboard">
            {/* Compact Verification Banner */}
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
              {/* My Activity Card */}
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
                  
                  {/* UPDATED: Navigates to Messages Page */}
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

              {/* Account Management Card */}
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