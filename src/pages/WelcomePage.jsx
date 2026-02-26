import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

export default function WelcomePage() {
  const navigate = useNavigate();
  
  // State for the Sign-in form on the Landing Page
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    // Simple validation for your project
    if (studentId === "2023307477" && password === "123456") {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Try again!");
    }
  };

  return (
    <div className="welcome-split-screen">
      {/* LEFT SIDE: The Login Form (White Side) */}
      <div className="form-column">
        <div className="form-container">
          <img src="/src/assets/adaptive-icon.png" alt="UniRent Logo" className="form-logo" />
          <h2 className="welcome-title">Login to UniRent</h2>
          
          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSignIn} className="signin-form">
            <div className="input-group">
              <span className="icon">👤</span>
              <input 
                type="text" 
                placeholder="Student ID (e.g. 2023307477)" 
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <span className="icon">🔒</span>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="login-btn">Log In</button>
            
            <div className="divider-line"></div>

            <p className="signup-prompt">New to UniRent?</p>
            <button 
              type="button" 
              className="signup-btn"
              onClick={() => navigate("/signup")}
            >
              Create New Account
            </button>
          </form>
          
          <p className="footer-copyright">© 2026 UniRent</p>
        </div>
      </div>

      {/* RIGHT SIDE: The Visual Imagery (Occupied fully by landing.png) */}
      <div className="visual-column">
        {/* Content removed to allow CSS background to occupy all space */}
      </div>
    </div>
  );
}