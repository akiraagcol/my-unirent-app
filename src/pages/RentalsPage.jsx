import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Rentals.css";

export default function RentalsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All", "Microcontrollers", "Sensors", "Actuators", 
    "Communication Modules", "Development Boards", "Power Modules", "Display Modules"
  ];

  const inventory = [
    { id: 1, name: "ARDUINO UNO R3", price: 30, status: "AVAILABLE", category: "Microcontrollers" },
    { id: 2, name: "ARDUINO MEGA 2560", price: 45, status: "AVAILABLE", category: "Microcontrollers" },
    { id: 3, name: "ESP32 DEVELOPMENT BOARD", price: 30, status: "AVAILABLE", category: "Development Boards" },
    { id: 4, name: "ESP8266 NODEMCU", price: 25, status: "AVAILABLE", category: "Development Boards" },
    { id: 5, name: "RASPBERRY PI 4 MODEL B", price: 100, status: "OCCUPIED", category: "Development Boards" },
    { id: 6, name: "ULTRASONIC SENSOR", price: 15, status: "AVAILABLE", category: "Sensors" },
  ];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="rentals-container">
      {/* Header is now outside the scrollable main area to stay visible */}
      <header className="rentals-header">
        <button className="back-dashboard-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
        
        <div className="search-bar-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search IoT devices..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="rentals-header-icons">
          <button className="icon-btn">🔔</button>
          <button className="icon-btn profile-circle">👤</button>
        </div>
      </header>

      <main className="rentals-main">
        <div className="category-filter-container">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="inventory-grid">
          {filteredInventory.length > 0 ? (
            filteredInventory.map((item) => (
              <div key={item.id} className="device-card">
                <div className="card-image-box">
                  <span className={`status-tag ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                  <p className="no-img-text">No Image Preview</p>
                </div>
                <div className="device-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-category">{item.category}</p>
                  <p className="item-price">₱{item.price}<span className="per-day">/day</span></p>
                  <button className="rent-action-btn" disabled={item.status === "OCCUPIED"}>
                    {item.status === "OCCUPIED" ? "Occupied" : "Rent Now"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results-msg">
              <p>No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}