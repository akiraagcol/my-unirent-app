import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginRedesign.css";
import { API_BASE_URL } from "../config";

export default function LoginPage() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState(""); 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page reload
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: studentId, // 🟢 FIXED: Removed "formData."
            password: password   // 🟢 FIXED: Removed "formData."
        }),
    });
    
    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access); 
        
        alert("Login successful!");
        navigate("/dashboard"); 
    } else {
        setError("Invalid credentials."); // 🟢 FIXED: Changed from "setErrorMessage"
        setIsLoading(false); // Added this so the loading spinner stops on failure
    }
    } catch (err) {
      setIsLoading(false);
      setError("Network error: Cannot reach server.");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card-redesign">
        <h1 className="login-header">Login</h1>
        {error && <div className="error-box">{error}</div>}
        
        {/* CRITICAL: onSubmit is on the form tag */}
        <form onSubmit={handleLogin} className="login-form-redesign">
          <input 
            name="studentId"
            type="text" 
            placeholder="Student ID" 
            value={studentId} 
            onChange={(e) => setStudentId(e.target.value)} 
            required 
          />
          <div style={{ position: 'relative', width: '100%' }}>
            <input 
              name="password"
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            {/* Optional: Simple toggle for the showPassword state */}
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '10px', top: '30%', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          
          {/* CRITICAL: type="submit" inside the form */}
          <button type="submit" className="login-submit-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login ➔"}
          </button>
        </form>
      </div>
    </div>
  );
}