import React from 'react';
import { products, rentals } from '../data/products';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const MarketplacePage = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-text">
          <h1>Smart Locker Dashboard</h1>
          <p>UniRent & USTP Command Center</p>
        </div>
        <button className="nav-rent-btn" onClick={() => navigate('/rentals')}>
          Rent Components →
        </button>
      </header>

      <div className="summary-grid">
        <div className="stat-card total"><span>TOTAL</span><h2>11</h2></div>
        <div className="stat-card available"><span>AVAILABLE</span><h2>7</h2></div>
        <div className="stat-card occupied"><span>OCCUPIED</span><h2>4</h2></div>
        <div className="stat-card maintenance"><span>MAINTENANCE</span><h2>2</h2></div>
      </div>

      {/* This Wrapper fills the screen width */}
      <div className="main-content-split">
        
        {/* Left: Lockers */}
        <section className="locker-section">
          <h3>Locker Status</h3>
          <div className="locker-grid">
            {products.map((item) => (
              <div key={item.id} className="locker-box-mini">
                <strong>{item.locker}</strong>
                <p style={{fontSize: '0.8rem', color: '#666'}}>{item.status}</p>
                <button className="open-mini-btn" style={{background: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', width: '100%', padding: '5px', fontWeight: 'bold'}}>Open</button>
              </div>
            ))}
          </div>
        </section>

        {/* Right: Activity (Sidebar style) */}
        <section className="activity-section">
          <h3>Recent Activity</h3>
          <div className="table-container">
            <table className="compact-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Activity</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((log, index) => (
                  <tr key={index}>
                    <td><strong>{log.time}</strong></td>
                    <td>{log.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};

export default MarketplacePage;