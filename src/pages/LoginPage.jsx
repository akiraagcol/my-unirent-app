import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginRedesign.css";

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
      // Updated to your MacBook's network IP
      const response = await fetch("http://192.168.5.95:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: studentId, 
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Task 6: Store token upon successful login
        localStorage.setItem("token", data.token); 
        setIsLoading(false);
        navigate("/dashboard"); 
      } else {
        setIsLoading(false);
        // Task 8: Handle error responses from API
        setError(data.error || "Invalid credentials.");
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