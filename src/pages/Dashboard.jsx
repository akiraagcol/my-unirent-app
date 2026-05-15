import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard"; 
import "../styles/Dashboard.css";
import { API_BASE_URL } from "../config"; 

export default function Dashboard({ cartCount }) {
  const navigate = useNavigate();
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetch(`${API_BASE_URL}/my-rentals/`, {
      method: "GET",
      headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch rentals.");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
            setRentals(data); 
        } else {
            setRentals([]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Data flow error:", err);
        setRentals([]); 
        setIsLoading(false);
      });
  }, [navigate]);

  const handleReturn = async (rentalId) => {
    if (!window.confirm("Are you sure you want to return this item? Make sure it is securely placed in the locker!")) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/return-item/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ rental_id: rentalId })
      });
      if (response.ok) {
        alert("Item successfully returned! The locker is now available.");
        window.location.reload(); 
      } else {
        alert("Failed to return item.");
      }
    } catch (err) {
      console.error("Error returning item:", err);
    }
  };

  // 🟢 NEW: The "Delete" function to complete your CRUD requirement!
  const handleDeleteRecord = async (rentalId) => {
    if (!window.confirm("Are you sure you want to permanently delete this rental record from your history?")) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      // Sending a strict DELETE network request
      const response = await fetch(`${API_BASE_URL}/my-rentals/${rentalId}/`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        alert("Rental record permanently deleted from database.");
        // Instantly remove it from the screen without needing to refresh
        setRentals(rentals.filter(r => r.id !== rentalId)); 
      } else {
        alert("Failed to delete record. Check your backend permissions.");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const activeRentals = rentals.filter(r => r.status === "Active").length;
  const overdueRentals = rentals.filter(r => r.status === "Overdue").length;

  const stats = [
    { label: "TOTAL RENTED", count: rentals.length, color: "total-card" }, 
    { label: "ACTIVE PICKUPS", count: activeRentals, color: "available-card" }, 
    { label: "OVERDUE", count: overdueRentals, color: "occupied-card" }
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-main-row">
          <h1 className="dashboard-title">UniRent Dashboard</h1>
          
          <div className="header-actions-container">
            <button type="button" className="primary-rent-btn" onClick={() => navigate("/rentals")}>
               Browse Marketplace
            </button>
            
            <button type="button" className="secondary-cart-btn" onClick={() => navigate("/cart")}>
              🛒 Cart <span className="cart-count-badge">{cartCount || 0}</span>
            </button>

            <div className="header-icons-group">
              <button type="button" className="icon-btn profile-circle" onClick={() => navigate("/profile")}>
                👤
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="stats-grid">
        {stats.map((item, index) => (
          <StatCard key={index} label={item.label} count={item.count} colorClass={item.color} />
        ))}
      </div>

      <div className="dashboard-main-content">
        <div className="section-card locker-section" style={{ flex: 2 }}>
          <h3 className="section-heading">My Active Rentals & Pickups</h3>
          <div className="locker-grid" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            
            {isLoading ? (
               <p style={{ color: "#94a3b8" }}>Loading your data...</p>
            ) : rentals.length === 0 ? (
               <div style={{ padding: "30px", textAlign: "center", backgroundColor: "#1e293b", borderRadius: "10px", color: "#94a3b8" }}>
                 <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>You have no active rentals.</p>
                 <p>Head to the Marketplace to rent your first device!</p>
               </div>
            ) : (
              rentals.map((rental) => (
                <div key={rental.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#1e293b", padding: "15px 20px", borderRadius: "10px", borderLeft: rental.status === "Active" ? "4px solid #2ecc71" : (rental.status === "Returned" ? "4px solid #64748b" : "4px solid #e74c3c"), opacity: rental.status === "Returned" ? 0.6 : 1 }}>
                  <div>
                    <h4 style={{ margin: "0 0 5px 0", color: "white", fontSize: "1.1rem" }}>
                      {rental.item_title} {rental.status === "Returned" && "(Returned)"}
                    </h4>
                    <p style={{ margin: "0", color: "#94a3b8", fontSize: "0.9rem" }}>Rented on: {rental.rental_date}</p>
                  </div>
                  
                  {/* 🟢 NEW: Logic to toggle between Active buttons and the Delete button */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                    {rental.status === "Returned" ? (
                      <button 
                        onClick={() => handleDeleteRecord(rental.id)}
                        style={{
                          backgroundColor: "#e74c3c", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", 
                          cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "5px"
                        }}
                      >
                        🗑️ Delete Record
                      </button>
                    ) : (
                      <>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ backgroundColor: "#34495e", padding: "5px 12px", borderRadius: "20px", display: "inline-block", color: "#f1c40f", fontWeight: "bold", fontSize: "0.9rem" }}>
                            🔒 {rental.locker_label}
                          </div>
                          <p style={{ margin: "0", color: rental.status === "Active" ? "#2ecc71" : "#e74c3c", fontSize: "0.85rem", fontWeight: "bold" }}>
                            {rental.status === "Active" ? `Due: ${rental.return_date}` : "OVERDUE"}
                          </p>
                        </div>
                        
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button 
                            onClick={() => handleReturn(rental.id)}
                            style={{
                              backgroundColor: "transparent", color: "#94a3b8", border: "1px solid #64748b", padding: "8px 16px", borderRadius: "5px", 
                              cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "5px"
                            }}
                          >
                            ↩️ Return
                          </button>

                          <button 
                            onClick={() => alert(`Connecting to IoT Locker ${rental.locker_label}... \n(Hardware integration coming soon!)`)}
                            style={{
                              backgroundColor: "#3498db", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", 
                              cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "5px"
                            }}
                          >
                            🔓 Open Locker
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
            
          </div>
        </div>

        <div className="section-card activity-section" style={{ flex: 1 }}>
          <h3 className="section-heading">Recent Activity</h3>
          <div className="activity-list">
             {rentals.slice(0, 4).map(rental => (
                <div className="activity-item" key={`act-${rental.id}`}>
                  <span className="activity-time" style={{ fontSize: "0.8rem", color: "#3498db" }}>{rental.rental_date?.split(',')[0]}</span>
                  <span className="activity-desc">
                    {rental.status === "Returned" 
                      ? `You returned the ${rental.item_title}.` 
                      : `You rented the ${rental.item_title}.`}
                  </span>
                </div>
             ))}
             {rentals.length === 0 && <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>No recent activity.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}