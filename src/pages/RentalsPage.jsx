import React, { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import "../styles/Rentals.css";

// Destructure addToCart and cartCount from props
export default function RentalsPage({ addToCart, cartCount }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Task 3: State for dynamic inventory
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true); // Task 8 Feedback
  const [error, setError] = useState(null); // Task 8 Feedback

  const categories = [
    "All", "Microcontrollers", "Sensors", "Actuators", 
    "Communication Modules", "Development Boards", "Power Modules", "Display Modules"
  ];

  // Task 3 & 7: Fetch data from Django API
  useEffect(() => {
    // Note: Since this is the Web UI on your Mac, use 127.0.0.1
    fetch("http://127.0.0.1:8000/api/items/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch inventory");
        return res.json();
      })
      .then((data) => {
        setInventory(data); // Data from Database flows to Web UI
        setLoading(false);
      })
      .catch((err) => {
        console.error("Web API Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredInventory = inventory.filter(item => {
    // Ensure we handle naming differences between your static array and API fields
    const itemName = item.name || item.title || ""; 
    const itemCategory = item.category || "General";
    
    const matchesSearch = itemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || itemCategory === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Task 8: Handle Loading State
  if (loading) return <div className="rentals-container"><p style={{padding: "20px"}}>Loading Marketplace...</p></div>;

  // Task 8: Handle Error State
  if (error) return <div className="rentals-container"><p style={{padding: "20px", color: "red"}}>Error: {error}</p></div>;

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
          <button type="button" className="icon-btn">🔔</button>
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
                <div className="card-image-box" onClick={() => navigate("/rent-details")}>
                  <span className={`status-tag ${(item.status || "AVAILABLE").toLowerCase()}`}>
                    {item.status || "AVAILABLE"}
                  </span>
                  {/* Task 7: Display images if they exist in your API */}
                  {item.img ? (
                    <img src={item.img} alt={item.name} className="card-image-preview" />
                  ) : (
                    <p className="no-img-text">No Image Preview</p>
                  )}
                </div>
                <div className="device-details">
                  <h3 className="item-name" onClick={() => navigate("/rent-details")}>
                    {item.name || item.title}
                  </h3>
                  <p className="item-category">{item.category}</p>
                  <p className="item-price">₱{item.price}<span className="per-day">/day</span></p>
                  
                  <button 
                    type="button"
                    className="rent-action-btn" 
                    disabled={item.status === "OCCUPIED"}
                    onClick={() => addToCart(item)}
                  >
                    {item.status === "OCCUPIED" ? "Occupied" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <section className="no-results-msg">
              <p>No results found for "{searchQuery}"</p>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}