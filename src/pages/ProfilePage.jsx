import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // States for the Edit Mode
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ full_name: "", username: "", password: "" });
  const [updateMsg, setUpdateMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchProfile();
  }, [navigate]);

  const fetchProfile = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetch("http://192.168.5.95:8000/api/profile/", {
      headers: { "Authorization": `Token ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setProfileData(data);
        setFormData({ full_name: data.full_name, username: data.username, password: "" });
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uniRentCart");
    window.location.href = "/";
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateMsg({ type: "", text: "" });
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://192.168.5.95:8000/api/update-profile/", {
        method: "PUT",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setUpdateMsg({ type: "success", text: "Profile updated successfully!" });
        setProfileData({ ...profileData, full_name: data.full_name, username: data.username });
        setFormData({ ...formData, password: "" }); // Clear password field
        setTimeout(() => setIsEditing(false), 2000); // Close form after 2 seconds
      } else {
        setUpdateMsg({ type: "error", text: data.error || "Failed to update profile." });
      }
    } catch (err) {
      setUpdateMsg({ type: "error", text: "Network error." });
    }
  };

  if (isLoading) return <div style={{ color: "white", padding: "50px", textAlign: "center" }}>Loading Profile...</div>;

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", paddingBottom: "50px" }}>
      {/* HEADER */}
      <header style={{ backgroundColor: "#1e293b", padding: "20px", display: "flex", alignItems: "center" }}>
        <button 
          onClick={() => navigate("/dashboard")} 
          style={{ backgroundColor: "transparent", border: "1px solid #f1c40f", color: "#f1c40f", padding: "8px 15px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
        >
          ← Back to Dashboard
        </button>
      </header>

      <main style={{ maxWidth: "1000px", margin: "40px auto", display: "flex", gap: "20px", flexWrap: "wrap", padding: "0 20px" }}>
        
        {/* LEFT COLUMN: Identity Card */}
        <section style={{ backgroundColor: "white", borderRadius: "10px", padding: "30px", flex: "1 1 300px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", textAlign: "center" }}>
          <div style={{ width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "#e2e8f0", margin: "0 auto 15px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>
            👤
          </div>
          <h2 style={{ margin: "0 0 5px 0", color: "#1e293b" }}>{profileData?.full_name}</h2>
          <p style={{ margin: "0 0 20px 0", color: "#64748b" }}>ID: {profileData?.username}</p>

          <div style={{ textAlign: "left", borderTop: "1px solid #e2e8f0", paddingTop: "20px", marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ color: "#64748b", fontSize: "0.9rem" }}>Member Since</span>
              <span style={{ fontWeight: "bold", color: "#1e293b", fontSize: "0.9rem" }}>{profileData?.member_since}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b", fontSize: "0.9rem" }}>Total Rentals</span>
              <span style={{ fontWeight: "bold", color: "#1e293b", fontSize: "0.9rem" }}>{profileData?.rentals_count || 0}</span>
            </div>
          </div>

          <button 
            onClick={handleLogout} 
            style={{ width: "100%", padding: "12px", border: "1px solid #e74c3c", color: "#e74c3c", backgroundColor: "white", borderRadius: "5px", fontWeight: "bold", cursor: "pointer" }}
          >
            Log Out
          </button>
        </section>

        {/* RIGHT COLUMN: Edit Profile & Activity */}
        <div style={{ flex: "2 1 600px", display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <section style={{ backgroundColor: "white", borderRadius: "10px", padding: "30px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: "0 0 20px 0", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px" }}>Account Management</h3>
            
            {!isEditing ? (
              <div>
                <div 
                  onClick={() => setIsEditing(true)} 
                  style={{ display: "flex", justifyContent: "space-between", padding: "15px 0", cursor: "pointer", borderBottom: "1px solid #f1f5f9" }}
                >
                  <span style={{ fontWeight: "bold", color: "#3498db" }}>✏️ Edit Profile</span>
                  <span style={{ color: "#94a3b8" }}>›</span>
                </div>
                <div 
                  onClick={() => navigate("/dashboard")} 
                  style={{ display: "flex", justifyContent: "space-between", padding: "15px 0", cursor: "pointer" }}
                >
                  <span style={{ fontWeight: "bold", color: "#1e293b" }}>📦 View My Rentals</span>
                  <span style={{ color: "#94a3b8" }}>›</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdateSubmit}>
                {updateMsg.text && (
                  <div style={{ padding: "10px", marginBottom: "15px", borderRadius: "5px", backgroundColor: updateMsg.type === "error" ? "#ffe6e6" : "#e6ffe6", color: updateMsg.type === "error" ? "red" : "green", fontSize: "0.9rem" }}>
                    {updateMsg.text}
                  </div>
                )}

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem", color: "#64748b" }}>Full Name</label>
                  <input type="text" value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #cbd5e1" }} required />
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem", color: "#64748b" }}>Student ID (Username)</label>
                  <input type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #cbd5e1" }} required />
                </div>

                <div style={{ marginBottom: "25px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem", color: "#64748b" }}>New Password <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>(leave blank to keep current)</span></label>
                  <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="••••••••" style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #cbd5e1" }} />
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="submit" style={{ backgroundColor: "#3498db", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Save Changes</button>
                  <button type="button" onClick={() => setIsEditing(false)} style={{ backgroundColor: "transparent", color: "#64748b", border: "1px solid #cbd5e1", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
                </div>
              </form>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}