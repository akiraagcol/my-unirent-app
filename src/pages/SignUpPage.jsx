import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginRedesign.css"; // Reuse your existing CSS for consistency

export default function SignUpPage() {
  const navigate = useNavigate();

  // Task 1: Component state for registration data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    college: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    
    
    console.log("Account Created successfully!", formData);

    navigate("/dashboard"); 
  };

  return (
    <div className="welcome-split-screen">
      {/* LEFT SIDE: Registration Form Section */}
      <div className="form-column">
        <div className="form-container" style={{ maxWidth: "450px" }}>
          <img src="/src/assets/adaptive-icon.png" alt="UniRent Logo" className="form-logo" style={{ width: "150px" }} />
          <h2 className="welcome-title" style={{ marginBottom: "20px" }}>Create Account</h2>
          
          <form onSubmit={handleSignUp} className="signin-form">
            <div className="input-group">
              <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <input type="text" name="studentId" placeholder="Student ID / Username" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <span style={{ padding: "10px", color: "#64748b" }}>📅</span>
              <input type="date" name="birthdate" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <select name="college" onChange={handleChange} required style={{ width: "100%", border: "none", background: "transparent", padding: "14px", outline: "none" }}>
                <option value="">Select College</option>
                <option value="CIT">College of Information Technology</option>
                <option value="COE">College of Engineering</option>
                <option value="COT">College of Technology</option>
              </select>
            </div>

            <div style={{ textAlign: "left", marginBottom: "20px", fontSize: "0.9rem" }}>
              <label style={{ color: "#64748b", cursor: "pointer" }}>
                <input type="checkbox" required style={{ marginRight: "10px" }} />
                I have read and agree to the <strong>Terms and Conditions</strong>
              </label>
            </div>

            <button type="submit" className="signup-btn" style={{ width: "100%", background: "#3498db" }}>
              Create Account
            </button>
            
            <p className="signup-prompt" style={{ marginTop: "20px" }}>
              Already have an account? 
              <span onClick={() => navigate("/")} style={{ color: "#3498db", cursor: "pointer", fontWeight: "bold", marginLeft: "5px" }}>
                Sign In
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE: Branding Section (Same as Welcome Page) */}
      <div className="branding-column">
        <div className="overlay-gradient"></div>
        <div className="branding-text">
          <h1 className="main-brand-name">UniRent</h1>
          <p className="brand-tagline">Join the community and start building your future.</p>
        </div>
      </div>
    </div>
  );
}