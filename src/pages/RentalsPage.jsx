import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import '../App.css';

const RentalsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Back to Dashboard
          </button>
          <h1>IoT Inventory</h1>
          <p>Available for Rent at USTP Smart Lockers</p>
        </div>
      </header>

      {/* This container will hold our grid of rental items */}
      <div className="rentals-grid-container">
        <div className="inventory-grid">
          {products.map((item) => (
            <div key={item.id} className={`inventory-card-new ${item.status.toLowerCase()}`}>
              <div className="card-top">
                <span className="category-label">Locker {item.locker}</span>
                <div className={`status-dot ${item.status.toLowerCase()}`}></div>
              </div>
              
              <div className="card-body">
                <h3>{item.name}</h3>
                <p className="price-text">₱{item.price} <small>/ day</small></p>
              </div>

              <div className="card-footer">
                {item.status === 'Available' ? (
                  <button className="rent-now-btn">Rent Now</button>
                ) : (
                  <button className="rent-disabled-btn" disabled>Occupied</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentalsPage;