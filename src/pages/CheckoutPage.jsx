import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css"; 

export default function CheckoutPage({ cart, clearCart }) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price), 0);
  const serviceFee = 50;
  const totalAmount = subtotal + serviceFee;

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

  // The Final API Call to Django
  const handleConfirmOrder = async () => {
    setIsProcessing(true);
    setErrorMsg("");

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const itemIds = cart.map(item => item.id);

    try {
      const response = await fetch("http://192.168.5.95:8000/api/checkout/", {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ item_ids: itemIds })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order Confirmed! Check your Dashboard for locker pickup instructions.");
        clearCart(); // Empty the cart
        navigate("/dashboard"); // Send them to their new dashboard
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

            {/* LEFT COLUMN: Pickup & Payment Details */}
            <section className="cart-items-section" style={{ backgroundColor: "#1e293b", padding: "30px", borderRadius: "10px", color: "white" }}>
              <h2 style={{ marginBottom: "25px", fontSize: "1.5rem", borderBottom: "1px solid #334155", paddingBottom: "10px" }}>
                Pickup & Payment
              </h2>

              {errorMsg && <div style={{color: "red", backgroundColor: "#ffe6e6", padding: "10px", marginBottom: "15px", borderRadius: "5px"}}>{errorMsg}</div>}

              <div style={{ marginBottom: "25px" }}>
                <h3 style={{ fontSize: "1.1rem", color: "#94a3b8", marginBottom: "10px" }}>Rental Duration</h3>
                <p style={{ backgroundColor: "#0f172a", padding: "15px", borderRadius: "5px", border: "1px solid #334155" }}>
                  Standard 3-Day Rental. Return date will be calculated automatically upon confirmation.
                </p>
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

              <div>
                <h3 style={{ fontSize: "1.1rem", color: "#94a3b8", marginBottom: "10px" }}>IoT Locker Instructions</h3>
                <ul style={{ paddingLeft: "20px", color: "#cbd5e1", lineHeight: "1.8" }}>
                  <li>Once confirmed, a specific IoT locker will be assigned to you.</li>
                  <li>Visit the UniRent smart locker station on campus.</li>
                  <li>Go to your Dashboard and click "Unlock" next to your active rental.</li>
                </ul>
              </div>
            </section>

            {/* RIGHT COLUMN: Final Order Summary */}
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
                
                <button 
                  type="button" 
                  className="btn-checkout-proceed"
                  onClick={handleConfirmOrder}
                  disabled={isProcessing}
                  style={{ opacity: isProcessing ? 0.7 : 1, cursor: isProcessing ? "wait" : "pointer", marginTop: "15px" }}
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