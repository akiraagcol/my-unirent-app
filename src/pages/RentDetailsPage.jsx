import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import "../styles/RentDetails.css";

export default function RentDetailsPage() {
  const navigate = useNavigate();

  const item = {
    name: "Arduino Uno R3",
    price: 25,
    status: "Available",
    owner: "Justin N.",
    rating: 4.8,
    reviews: 25,
    description: "The Arduino Uno R3 is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins, 6 analog inputs, and a 16 MHz quartz crystal.",
    specs: ["Microcontroller: ATmega328P", "Operating Voltage: 5V", "Input Voltage: 7-12V", "Digital I/O Pins: 14"],
    terms: "Minimum 2 days rental. Return in original condition. Late fees apply."
  };

  return (
    <div className="modern-rent-bg"> {/* Sky Blue Background wrapper */}
      <main className="marketplace-container">
        <header className="breadcrumb-nav">
          <button type="button" className="text-link" onClick={() => navigate(-1)}>
            ← Back to Marketplace
          </button>
        </header>

        <section className="main-product-card">
          {/* Left: Image Gallery Section */}
          <div className="gallery-column">
            <div className="main-image-wrapper">
              <span className={`floating-badge ${item.status.toLowerCase()}`}>
                {item.status}
              </span>
              <img src="https://via.placeholder.com/600x450" alt={item.name} className="big-image" />
            </div>
            <div className="thumbnail-row">
              <div className="thumb active"></div>
              <div className="thumb"></div>
              <div className="thumb"></div>
            </div>
          </div>

          {/* Right: Essential Info Section */}
          <div className="details-column">
            <h1 className="product-title">{item.name}</h1>
            
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
                <p className="owner-name-text">{item.owner}</p>
                <div className="rating-row">⭐ {item.rating} <span>({item.reviews} reviews)</span></div>
              </div>
              <button type="button" className="chat-btn-modern">Chat</button>
            </div>

            <button type="button" className="primary-rent-btn" onClick={addItem}>
                 Add Test Locker
              </button>

            <div className="purchase-buttons">
              <button type="button" className="btn-secondary-yellow">Add to Cart</button>
              <button type="button" className="btn-primary-navy">Rent Now</button>
            </div>
          </div>
        </section>

        {/* New Sections to fill whitespace */}
        <div className="secondary-content-grid">
          <section className="description-box shadow-card">
            <h3>Item Description</h3>
            <p>{item.description}</p>
            <h3 className="mt-20">Specifications</h3>
            <ul>
              {item.specs.map((spec, i) => <li key={i}>{spec}</li>)}
            </ul>
          </section>

          <aside className="terms-box shadow-card">
            <h3>Rental Terms</h3>
            <p>{item.terms}</p>
          </aside>
        </div>
      </main>
    </div>
  );
}