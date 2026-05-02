import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

export default function CartPage({ cart, removeFromCart }) {
  const navigate = useNavigate();
  
  // Logic: Calculate subtotal from items
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price), 0);
  const serviceFee = 50;
  const totalAmount = subtotal + serviceFee;

  return (
    <div className="cart-page-wrapper">
      {/* HEADER: Centered with main content */}
      <div className="cart-content-container">
        <header className="cart-page-header">
          <button type="button" className="btn-back-link" onClick={() => navigate("/rentals")}>
            ← Continue Browsing
          </button>
          <h1 className="cart-main-title">My Cart</h1>
        </header>

        <main className="cart-main-layout">
          {(!cart || cart.length === 0) ? (
            /* EMPTY STATE: Visual clarity for users */
            <section className="empty-state-card" role="status">
              <div className="empty-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Ready to start your next IoT project?</p>
              <button className="btn-browse-cta" onClick={() => navigate("/rentals")}>
                Browse Devices
              </button>
            </section>
          ) : (
            /* ACTIVE CART: Balanced 2-Column Grid */
            <div className="cart-grid-desktop">
              
              {/* LEFT COLUMN: Items List */}
              <section className="cart-items-section">
                {cart.map((item, index) => {
                  // Format the image URL safely just like the Marketplace page
                  const imageUrl = item.image 
                    ? (item.image.startsWith('http') ? item.image : `http://192.168.5.95:8000${item.image}`) 
                    : null;

                  return (
                    <article key={`${item.id}-${index}`} className="item-horizontal-card">
                      
                      {/* FIXED: Replaced Placeholder with Actual Image */}
                      <div className="item-img-placeholder" style={{ backgroundColor: "#1e293b", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {imageUrl ? (
                          <img 
                            src={imageUrl} 
                            alt={item.title} 
                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} 
                          />
                        ) : (
                          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>No Image</span>
                        )}
                      </div>
                      
                      <div className="item-text-info">
                        <h3 className="item-display-name">{item.title || item.name}</h3>
                        <p className="item-display-cat">{item.category}</p>
                        <p className="item-display-price">₱{item.price}<span className="unit">/day</span></p>
                      </div>

                      <div className="item-action-area">
                        <button 
                          type="button" 
                          className="btn-item-remove" 
                          onClick={() => removeFromCart(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </article>
                  );
                })}
              </section>

              {/* RIGHT COLUMN: Sticky Summary */}
              <aside className="cart-summary-sidebar">
                <div className="sticky-summary-box">
                  <h3 className="summary-card-title">Order Summary</h3>
                  <div className="summary-row">
                    <span>Total Items</span>
                    <span className="val-bold">{cart.length}</span>
                  </div>
                  <div className="summary-row">
                    <span>Service Fee</span>
                    <span className="val-bold">₱{serviceFee.toFixed(2)}</span>
                  </div>
                  <hr className="summary-divider" />
                  <div className="summary-row total-row">
                    <span>Total Amount</span>
                    <span className="val-final">₱{totalAmount.toFixed(2)}</span>
                  </div>
                  
                  <button 
                    type="button" 
                    className="btn-checkout-proceed"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </aside>

            </div>
          )}
        </main>
      </div>
    </div>
  );
}