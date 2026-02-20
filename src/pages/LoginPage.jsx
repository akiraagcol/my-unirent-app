import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate authentication
    console.log("Logging in with:", credentials);
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
    boxSizing: "border-box",
    marginBottom: "1.5rem"
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content" style={{ maxWidth: '400px' }}>
        <h1 className="welcome-title" style={{ fontSize: "2.5rem" }}>Welcome Back</h1>
        <p className="welcome-subtitle">Please enter your details to log in.</p>

        <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
          <label style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>Name</label>
          <input 
            type="text" 
            required 
            style={inputStyle} 
            placeholder="Enter your name"
            onChange={(e) => setCredentials({...credentials, name: e.target.value})}
          />

          <label style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>Password</label>
          <input 
            type="password" 
            required 
            style={inputStyle} 
            placeholder="Enter your password"
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          />

          <div className="button-group">
            <button type="submit" className="primary-btn" style={{ width: "100%" }}>
              Log In
            </button>
            <button type="button" className="secondary-btn" style={{ width: "100%" }} onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}