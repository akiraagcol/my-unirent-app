import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginRedesign.css";

export default function LoginPage() {
  const navigate = useNavigate();
  
  // Task 1: Component-level state to manage UI data [cite: 13, 72]
  const [studentId, setStudentId] = useState(""); 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  
  // New state for handling error messages (Notifications/Alerts) 
  const [error, setError] = useState(""); 

  // Task 2: Form submission handling using state [cite: 33, 73]
  const handleLogin = (e) => {
    e.preventDefault();

    // Logic to trigger a meaningful UI update [cite: 34, 63]
    if (studentId === "2023307477" && password === "123456") {
      setError(""); // Clear error state on success
      navigate("/dashboard"); // Multi-page navigation [cite: 43, 62]
    } else {
      // Update state to show a visible error notification [cite: 20, 25]
      setError("Invalid Student ID or password. Please try again.");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-overlay">
        <div className="ustp-logo-container">
          <img src="/src/assets/adaptive-icon.png" alt="UniRent Logo" className="ustp-header-logo" />
        </div>

        <div className="login-card-redesign">
          <h1 className="login-header" style={{ color: "#ffffff" }}>Login to your account</h1>
          
          {/* Visible UI Update: Conditional rendering of the error state  */}
          {error && (
            <div style={{ 
              backgroundColor: "#fee2e2", 
              color: "#b91c1c", 
              padding: "12px", 
              borderRadius: "4px", 
              marginBottom: "20px", 
              textAlign: "center",
              fontSize: "0.9rem",
              border: "1px solid #f87171"
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="login-form-redesign">
            {/* Task 2: Controlled input field for Student ID [cite: 32, 73] */}
            <div className="input-with-icon">
              <span className="input-icon">👤</span>
              <input 
                type="text" 
                placeholder="Student ID (e.g. 2023307477)" 
                value={studentId} 
                onChange={(e) => setStudentId(e.target.value)} 
                required 
              />
            </div>

            {/* Task 2: Controlled input field for Password [cite: 32, 73] */}
            <div className="input-with-icon">
              <span className="input-icon">🔒</span>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            <div className="form-options">
              <label className="remember-me" style={{ color: "#ffffff", display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="checkbox" /> Remember Me
              </label>
              <button type="submit" className="login-submit-btn">
                Login ➔
              </button>
            </div>

            <div className="login-footer-links" style={{ marginTop: "30px" }}>
              <p className="forgot-text" style={{ color: "#ffffff", marginBottom: "10px" }}>Forgot your password?</p>
              <p className="reset-text" style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>
                no worries, <span className="click-here" style={{ color: "#3498db", cursor: "pointer", fontWeight: "bold" }}>please click here</span> to reset your password.
              </p>
            </div>
          </form>
        </div>

        <div className="login-page-footer" style={{ marginTop: "auto", paddingBottom: "40px", textAlign: "center", color: "#ffffff" }}>
          <div className="language-selector">
            Choose Language 
            <select className="lang-dropdown" style={{ marginLeft: "10px", padding: "2px 8px", borderRadius: "4px" }}>
              <option>English</option>
              <option>Filipino</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}