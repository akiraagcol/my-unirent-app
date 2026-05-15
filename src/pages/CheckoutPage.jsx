import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css"; 
import { API_BASE_URL } from "../config"; // 🟢 ADDED: Dynamic IP Config

export default function CheckoutPage({ cart, clearCart }) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // State for Locker Selection
  const [selectedLocker, setSelectedLocker] = useState("");
  const [occupiedLockers, setOccupiedLockers] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const lockerOptions = ["A1", "B2", "C3", "D4", "E5"];

  // Math logic
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price), 0);
  const serviceFee = 50;
  const totalAmount = subtotal + serviceFee;

  // Fetch items to see which lockers are currently in use
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // 🟢 FIXED: Using dynamic API_BASE_URL and Bearer token
    fetch(`${API_BASE_URL}/items/`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      // Find all items that are "Occupied" and extract their locker labels
      // Added Array.isArray check to prevent mapping errors
      if (Array.isArray(data)) {
        const inUse = data
          .filter(item => item.status === "Occupied" && item.locker_label)
          .map(item => item.locker_label);
        setOccupiedLockers(inUse);
      }
    })
    .catch(err => console.error("Error fetching locker availability:", err));
  }, []);

  if (!cart || cart.length === 0) {
    return (
      <div className="cart-page-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h2 style={{ color: 'white', marginBottom: '20px' }}>Your cart is empty.</h2>
        <button className="btn-browse-cta" onClick={() => navigate("/rentals")} style={{ padding: "10px 20px" }}>
          Return to Marketplace
        </button>
      </div>
    );
  }

  const handleConfirmOrder = async () => {
    // Validate locker selection before proceeding
    if (!selectedLocker) {
      setErrorMsg("Please select an available IoT locker to proceed.");
      return;
    }

    setIsProcessing(true);
    setErrorMsg("");

    const token = localStorage.getItem("token");
    const itemIds = cart.map(item => item.id);

    try {
      // 🟢 FIXED: Using dynamic API_BASE_URL and Bearer token for the POST transaction
      const response = await fetch(`${API_BASE_URL}/checkout/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ item_ids: itemIds, locker_id: selectedLocker }) 
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Order Confirmed! Your items will be assigned to Locker ${selectedLocker}.`);
        clearCart(); 
        navigate("/dashboard"); 
      } else {
        setErrorMsg(data.error || "Checkout failed.");
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      setErrorMsg("Network error. Could not reach the server.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="cart-page-wrapper">
      <div className="cart-content-container">
        <header className="cart-page-header">
          <button type="button" className="btn-back-link" onClick={() => navigate("/cart")}>
            ← Back to Cart
          </button>
          <h1 className="cart-main-title">Secure Checkout</h1>
        </header>

        <main className="cart-main-layout">
          <div className="cart-grid-desktop">

            <section className="cart-items-section" style={{ backgroundColor: "#1e293b", padding: "30px", borderRadius: "10px", color: "white" }}>
              <h2 style={{ marginBottom: "25px", fontSize: "1.5rem", borderBottom: "1px solid #334155", paddingBottom: "10px" }}>
                Pickup Details
              </h2>

              {errorMsg && <div style={{color: "red", backgroundColor: "#ffe6e6", padding: "10px", marginBottom: "15px", borderRadius: "5px"}}>{errorMsg}</div>}

              {/* Interactive Locker Selection Grid */}
              <div style={{ marginBottom: "25px" }}>
                <h3 style={{ fontSize: "1.1rem", color: "#94a3b8", marginBottom: "10px" }}>Choose an Available Locker</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
                  {lockerOptions.map(locker => {
                    const isOccupied = occupiedLockers.includes(locker);
                    return (
                      <button
                        key={locker}
                        type="button"
                        disabled={isOccupied}
                        onClick={() => setSelectedLocker(locker)}
                        style={{
                          padding: "15px",
                          borderRadius: "8px",
                          border: selectedLocker === locker ? "2px solid #f1c40f" : "1px solid #334155",
                          backgroundColor: isOccupied ? "#0f172a" : (selectedLocker === locker ? "#34495e" : "#1e293b"),
                          color: isOccupied ? "#475569" : "white",
                          cursor: isOccupied ? "not-allowed" : "pointer",
                          fontWeight: "bold",
                          opacity: isOccupied ? 0.6 : 1,
                          transition: "all 0.2s"
                        }}
                      >
                        {locker} {isOccupied && "🔒"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginBottom: "25px" }}>
                <h3 style={{ fontSize: "1.1rem", color: "#94a3b8", marginBottom: "10px" }}>Payment Method</h3>
                <select 
                  value={paymentMethod} 
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ width: "100%", padding: "15px", borderRadius: "5px", backgroundColor: "#0f172a", color: "white", border: "1px solid #334155", outline: "none", fontSize: "1rem" }}
                >
                  <option value="cash">Cash on Pickup (Locker Kiosk)</option>
                
                </select>
              </div>
            </section>

            <aside className="cart-summary-sidebar">
              <div className="sticky-summary-box">
                <h3 className="summary-card-title">Final Order Summary</h3>
                
                <div style={{ marginBottom: "20px", maxHeight: "250px", overflowY: "auto", borderBottom: "1px solid #e2e8f0", paddingBottom: "15px" }}>
                  {cart.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "0.95rem", color: "#475569" }}>
                      <span style={{ fontWeight: "bold" }}>1x {item.title || item.name}</span>
                      <span>₱{Number(item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span className="val-bold">₱{subtotal.toFixed(2)}</span>
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
                
                {/* Submit button is disabled until they pick a locker */}
                <button 
                  type="button" 
                  className="btn-checkout-proceed"
                  onClick={handleConfirmOrder}
                  disabled={isProcessing || !selectedLocker}
                  style={{ opacity: (isProcessing || !selectedLocker) ? 0.6 : 1, cursor: (isProcessing || !selectedLocker) ? "not-allowed" : "pointer", marginTop: "15px" }}
                >
                  {isProcessing ? "Processing Security..." : "Confirm Rental"}
                </button>
              </div>
            </aside>

          </div>
        </main>
      </div>
    </div>
  );
}