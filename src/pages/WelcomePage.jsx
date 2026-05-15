import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";
import { API_BASE_URL } from "../config"; // 🟢 ADDED: Dynamic IP Config

export default function WelcomePage() {
  const navigate = useNavigate();
  
  // State for the Sign-in form on the Landing Page
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 🟢 FIXED: Using dynamic URL and the new /token/ endpoint for JWT
      const response = await fetch(`${API_BASE_URL}/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: studentId, // Django expects 'username'
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 🟢 FIXED: JWT uses 'access' instead of 'token'
        localStorage.setItem("token", data.access); 
        setIsLoading(false);
        navigate("/dashboard"); 
      } else {
        setIsLoading(false);
        // JWT usually sends error details in the 'detail' key
        setError(data.detail || data.error || "Invalid credentials. Try again!");
      }
    } catch (err) {
      setIsLoading(false);
      setError("Network error: Cannot reach server.");
    }
  };

  return (
    <div className="welcome-split-screen">
      {/* LEFT SIDE: The Login Form (White Side) */}
      <div className="form-column">
        <div className="form-container">
          <img src="/src/assets/adaptive-icon.png" alt="UniRent Logo" className="form-logo" />
          <h2 className="welcome-title">Login to UniRent</h2>
          
          {error && <p className="error-text" style={{ color: 'red' }}>{error}</p>}

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

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
            
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