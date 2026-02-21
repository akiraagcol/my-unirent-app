import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Rentals.css';

export default function RentalsPage() {
  const navigate = useNavigate();

  const categories = ["All Categories", "Microcontrollers", "Single-board"];
  
  const products = [
    { id: 1, name: "ARDUINO UNO R3", price: "₱25/day", status: "AVAILABLE" },
    { id: 2, name: "ARDUINO MEGA 2560", price: "₱45/day", status: "AVAILABLE" },
    { id: 3, name: "ESP32 DEVELOPMENT BOARD", price: "₱30/day", status: "AVAILABLE" },
    { id: 4, name: "ESP8266 NODEMCU", price: "₱20/day", status: "AVAILABLE" },
    { id: 5, name: "RASPBERRY PI ZERO W", price: "₱50/day", status: "AVAILABLE" },
    { id: 6, name: "NVIDIA JETSON NANO", price: "₱150/day", status: "AVAILABLE" },
  ];

  return (
    <div className="rentals-container">
      {/* Organized Header */}
      <header className="rentals-header">
        <div className="header-left">
          <h1 className="logo-text">Uni<span className="logo-accent">Rent</span></h1>
        </div>
        
        <div className="header-right">
          <button className="nav-icon-btn">🔔</button>
          <button className="nav-icon-btn">🛒</button>
          <button className="dashboard-link-btn" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
        </div>
      </header>

      {/* Search and Category Section */}
      <div className="search-filter-section">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input type="text" className="search-input" placeholder="Search devices..." />
        </div>
        
        <div className="category-container">
          {categories.map((cat, index) => (
            <button key={index} className={`category-pill ${index === 0 ? 'active' : ''}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <main className="rentals-grid">
        {products.map((product) => (
          <div key={product.id} className="item-card">
            <div className="item-image-area">
              <div className="availability-tag">
                <span className="dot"></span> {product.status}
              </div>
              <p className="placeholder-text">Image not available</p>
            </div>
            <div className="item-details">
              <h3 className="item-title">{product.name}</h3>
              <p className="item-price">{product.price}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}