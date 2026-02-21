import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";
import logo from "../assets/logo.png";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <img src={logo} alt="UniRent logo" className="welcome-logo" />
        <p className="welcome-subtitle">Browse and rent IoT devices for your projects</p>

        <div className="button-group">
          <button className="primary-btn" onClick={() => navigate("/signup")}>
            Get Started
          </button>
        
        </div>
        <div className="footer-text">© 2026 UniRent</div>
      </div>
    </div>
  );
}