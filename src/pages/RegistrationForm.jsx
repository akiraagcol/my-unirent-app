import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

export default function RegistrationForm() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    birthday: "",
    department: "",
    password: "",
    confirmPassword: "",
    studentIdFile: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation to check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Registration Data:", formData);
    navigate("/dashboard");
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
    fontSize: "1rem",
    boxSizing: "border-box"
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content" style={{ maxWidth: '500px' }}>
        <h2 className="welcome-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Registration
        </h2>
        <p className="welcome-subtitle" style={{ marginBottom: "2rem" }}>
          Please complete your details to access the UniRent dashboard.
        </p>

        <form onSubmit={handleSubmit} style={{ width: "100%", textAlign: "left" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>Full Name</label>
            <input 
              type="text" 
              required 
              style={inputStyle} 
              placeholder="Enter your full name"
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>Birthday</label>
            <input 
              type="date" 
              required 
              style={inputStyle} 
              onChange={(e) => setFormData({...formData, birthday: e.target.value})}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>College / Department</label>
            <select 
              required 
              style={inputStyle}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
            >
              <option value="">Select Department</option>
              <option value="CEA">College of Engineering and Architecture</option>
              <option value="CIT">College of Information Technology</option>
              <option value="COT">College of Technology</option>
              <option value="CSTE">College of Science and Technology Education</option>
            </select>
          </div>

          {/* New Password Field */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>Password</label>
            <input 
              type="password" 
              required 
              style={inputStyle} 
              placeholder="Create a password"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {/* New Confirm Password Field */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>Confirm Password</label>
            <input 
              type="password" 
              required 
              style={inputStyle} 
              placeholder="Re-type your password"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>Upload Student ID</label>
            <input 
              type="file" 
              required 
              accept="image/*,.pdf"
              style={{ ...inputStyle, padding: "8px" }}
              onChange={(e) => setFormData({...formData, studentIdFile: e.target.files[0]})}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="primary-btn" style={{ width: "100%" }}>
              Complete & Enter Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}