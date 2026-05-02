import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginRedesign.css"; 

export default function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    college: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match! Please try again.");
      return; 
    }
    
    setIsLoading(true);

    try {
      const response = await fetch("http://192.168.5.95:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.studentId, 
          password: formData.password,
          email: formData.email,
          full_name: formData.fullName,
          department: formData.college,
          birthday: formData.birthdate
        }),
      });

      if (response.ok) {
        alert("Account created successfully! You can now log in.");
        navigate("/"); // Send them to the Login page
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Registration failed. Please check your details.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setErrorMessage("Network error: Cannot reach the server. Is Django running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="welcome-split-screen">
      <div className="form-column">
        <div className="form-container" style={{ maxWidth: "450px" }}>
          <img src="/src/assets/adaptive-icon.png" alt="App Logo" className="form-logo" style={{ width: "150px" }} />
          <h2 className="welcome-title" style={{ marginBottom: "20px" }}>Create Account</h2>
          
          <form onSubmit={handleSignUp} className="signin-form">
            
            {errorMessage && (
              <div style={{ color: "red", marginBottom: "15px", fontSize: "0.9rem", textAlign: "center", backgroundColor: "#ffe6e6", padding: "10px", borderRadius: "5px" }}>
                {errorMessage}
              </div>
            )}

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

            <button type="submit" className="signup-btn" disabled={isLoading} style={{ width: "100%", background: "#3498db", color: "white", padding: "12px", border: "none", borderRadius: "5px", cursor: isLoading ? "not-allowed" : "pointer" }}>
              {isLoading ? "Creating Account..." : "Create Account"}
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

      <div className="branding-column">
        <div className="overlay-gradient"></div>
        <div className="branding-text">
          <h1 className="main-brand-name">Sign Up</h1>
          <p className="brand-tagline">Join the community and start building your future.</p>
        </div>
      </div>
    </div>
  );
}