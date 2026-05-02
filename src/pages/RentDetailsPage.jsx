import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/RentDetails.css";

export default function RentDetailsPage({ addToCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const item = location.state?.item;

  if (!item) {
    return (
      <div className="modern-rent-bg" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white', flexDirection: 'column'}}>
        <h2>Item not found.</h2>
        <button className="btn-primary-navy" onClick={() => navigate("/rentals")} style={{marginTop: "20px", padding: "10px 20px"}}>
          Return to Marketplace
        </button>
      </div>
    );
  }

  const imageUrl = item.image 
    ? (item.image.startsWith('http') ? item.image : `http://192.168.5.95:8000${item.image}`) 
    : null;

  return (
    <div className="modern-rent-bg">
      <main className="marketplace-container">
        <header className="breadcrumb-nav">
          <button type="button" className="text-link" onClick={() => navigate(-1)}>
            ← Back to Marketplace
          </button>
        </header>

        <section className="main-product-card">
          {/* Left: Image Gallery Section */}
          <div className="gallery-column">
            <div className="main-image-wrapper" style={{ position: "relative", width: "100%", height: "400px", backgroundColor: "white", borderRadius: "10px", overflow: "hidden" }}>
              <span className={`floating-badge ${(item.status || "AVAILABLE").toLowerCase()}`} style={{ position: "absolute", top: "20px", left: "20px", zIndex: 2 }}>
                {item.status || "AVAILABLE"}
              </span>
              
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={item.title} 
                  className="big-image" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain', // Prevents stretching while keeping the image completely visible
                    backgroundColor: 'white' 
                  }} 
                />
              ) : (
                <div className="big-image" style={{ width: "100%", height: "100%", backgroundColor: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
                  No Image Provided
                </div>
              )}
            </div>
          </div>

          {/* Right: Essential Info Section */}
          <div className="details-column">
            <h1 className="product-title">{item.title}</h1> 
            <p className="item-category" style={{color: "#64748b", fontWeight: "bold", textTransform: "uppercase", fontSize: "0.85rem"}}>{item.category}</p>
            
            <div className="price-box">
              <span className="price-main">₱{item.price}</span>
              <span className="price-unit">/ day</span>
            </div>

            <div className="action-card">
              <label htmlFor="date-checker" className="label-small">Rental Duration</label>
              <button id="date-checker" type="button" className="calendar-trigger">
                📅 Select Rental Dates
              </button>
            </div>

            <div className="owner-profile-card">
              <div className="avatar-circle">👤</div>
              <div className="owner-info">
                <p className="posted-label">Posted by</p>
                <p className="owner-name-text">Verified User (ID: {item.owner})</p>
                <div className="rating-row">⭐ {item.rating || 0} <span>(0 reviews)</span></div>
              </div>
            </div>

            <div className="purchase-buttons">
              <button 
                type="button" 
                className="btn-secondary-yellow"
                disabled={item.status === "Occupied"}
                onClick={() => {
                  addToCart(item);
                  navigate("/cart"); 
                }}
                style={{ opacity: item.status === "Occupied" ? 0.5 : 1, cursor: item.status === "Occupied" ? "not-allowed" : "pointer" }}
              >
                Add to Cart
              </button>
              
              <button 
                type="button" 
                className="btn-primary-navy"
                disabled={item.status === "Occupied"}
                style={{ opacity: item.status === "Occupied" ? 0.5 : 1, cursor: item.status === "Occupied" ? "not-allowed" : "pointer" }}
              >
                {item.status === "Occupied" ? "Currently Rented" : "Rent Now"}
              </button>
            </div>
          </div>
        </section>

        <div className="secondary-content-grid">
          <section className="description-box shadow-card">
            <h3>Item Description</h3>
            <p>{item.description || "No description provided by the owner."}</p>
            
            {/* REMOVED: The Locker Location hardcoded text has been removed entirely! */}
          </section>

          <aside className="terms-box shadow-card">
            <h3>Rental Terms</h3>
            <p>Minimum 2 days rental. Return in original condition to the assigned IoT Locker. Late fees apply for overdue returns.</p>
          </aside>
        </div>
      </main>
    </div>
  );
}