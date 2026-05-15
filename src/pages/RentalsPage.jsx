import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import "../styles/Rentals.css";
import { API_BASE_URL } from "../config"; // 🟢 ADDED: Dynamic Config Import

export default function RentalsPage({ addToCart, cartCount }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const categories = [
    "All", "Microcontrollers", "Sensors", "Actuators", 
    "Communication Modules", "Development Boards", "Power Modules", "Display Modules"
  ];

  // Securely Fetch real data from Django API
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/"); 
      return;
    }

    // 🟢 FIXED: Using dynamic API_BASE_URL
    fetch(`${API_BASE_URL}/items/`, {
      method: "GET",
      headers: {
       "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch inventory");
        return res.json();
      })
      .then((data) => {
        // 🟢 FIXED: Safety check to prevent the White Screen of Death
        if (Array.isArray(data)) {
            setInventory(data); 
        } else {
            setInventory([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Web API Error:", err);
        setError("Could not connect to the database. Make sure Django is running.");
        setInventory([]); // 🟢 Fallback to prevent crash
        setLoading(false);
      });
  }, [navigate]);

  const filteredInventory = inventory.filter(item => {
    const itemName = item.title || ""; 
    const itemCategory = item.category || "General";
    
    const matchesSearch = itemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || itemCategory === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="rentals-container"><p style={{padding: "20px", color: "white"}}>Loading Marketplace...</p></div>;
  if (error) return <div className="rentals-container"><p style={{padding: "20px", color: "#ff6b6b"}}>Error: {error}</p></div>;

  return (
    <div className="rentals-container">
      <header className="rentals-header">
        <button type="button" className="back-dashboard-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
        
        <div className="search-bar-container">
          <label htmlFor="device-search" className="search-icon">🔍</label>
          <input 
            id="device-search"
            type="text" 
            placeholder="Search IoT devices..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="rentals-header-icons">
          <button 
            type="button" 
            className="icon-btn cart-nav-btn" 
            onClick={() => navigate("/cart")}
          >
            🛒 <span className="cart-badge">{cartCount || 0}</span>
          </button>
          <button type="button" className="icon-btn profile-circle" onClick={() => navigate("/profile")}>👤</button>
        </div>
      </header>

      <main className="rentals-main">
        <div className="category-filter-container">
          {categories.map(cat => (
            <button 
              key={cat} 
              type="button"
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
                <div 
                  className="card-image-box" 
                  onClick={() => navigate("/rent-details", { state: { item: item } })}
                  style={{ cursor: "pointer", position: "relative", width: "100%", height: "200px" }} 
                >
                  <span className={`status-tag ${(item.status || "AVAILABLE").toLowerCase()}`} style={{ position: "absolute", top: "10px", right: "10px", zIndex: 2 }}>
                    {item.status || "AVAILABLE"}
                  </span>
                  
                  {item.image ? (
                    <img 
                      /* 🟢 FIXED: Image URLs are now 100% dynamic! */
                      src={item.image.startsWith('http') ? item.image : `http://${window.location.hostname}:8000${item.image}`} 
                      alt={item.title} 
                      className="card-image-preview" 
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover", 
                        borderTopLeftRadius: "10px", 
                        borderTopRightRadius: "10px" 
                      }}
                    />
                  ) : (
                    <div className="no-img-placeholder" style={{width: "100%", height: "100%", backgroundColor: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", borderTopLeftRadius: "10px", borderTopRightRadius: "10px"}}>
                      No Image
                    </div>
                  )}
                </div>
                
                <div className="device-details">
                  <h3 className="item-name" onClick={() => navigate("/rent-details", { state: { item: item } })} style={{cursor: "pointer"}}>
                    {item.title}
                  </h3>
                  <p className="item-category" style={{color: "#94a3b8", fontSize: "0.85rem", marginBottom: "5px"}}>{item.category}</p>
                  <p className="item-price" style={{color: "#3498db", fontWeight: "bold"}}>₱{item.price}<span className="per-day" style={{color: "#64748b", fontSize: "0.8rem", fontWeight: "normal"}}>/day</span></p>
                  
                  <button 
                    type="button"
                    className="rent-action-btn" 
                    disabled={item.status === "Occupied"}
                    onClick={() => addToCart(item)}
                    style={{
                      width: "100%", marginTop: "10px", padding: "10px", borderRadius: "5px", border: "none", cursor: item.status === "Occupied" ? "not-allowed" : "pointer",
                      backgroundColor: item.status === "Occupied" ? "#475569" : "#f1c40f", color: item.status === "Occupied" ? "#94a3b8" : "#1e293b", fontWeight: "bold"
                    }}
                  >
                    {item.status === "Occupied" ? "Occupied" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <section className="no-results-msg" style={{color: "white", padding: "20px"}}>
              <p>No marketplace items available.</p>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}