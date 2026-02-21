import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

export default function SignUpPage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">Create Account</h1>
        <p className="welcome-subtitle">Join UniRent to start renting IoT devices for your school projects.</p>

        <div className="button-group">
          <button className="primary-btn" onClick={() => navigate("/register-details")}>
            Sign Up
          </button>
          
          {/* Updated button to route to Login */}
          <button className="secondary-btn" onClick={() => navigate("/login")}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}