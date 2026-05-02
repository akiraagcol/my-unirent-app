import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Notifications.css";

export default function NotificationDropdown({ notifications, onClose }) {
  const navigate = useNavigate();

  return (
    <div className="notif-dropdown">
      <div className="notif-header">
        <h3>Notifications</h3>
        <button className="mark-read">Mark all as read</button>
      </div>
      <div className="notif-list">
        {notifications.map((n) => (
          <div 
            key={n.id} 
            className="notif-item" 
            onClick={() => { navigate(n.link); onClose(); }}
          >
            <div className={`notif-icon ${n.type}`}>
              {n.type === 'post' ? '📦' : n.type === 'locker' ? '🔒' : '📥'}
            </div>
            <div className="notif-content">
              <p className="notif-text">{n.text}</p>
              <span className="notif-time">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="notif-footer">
        <button onClick={() => navigate("/notifications")}>See all notifications</button>
      </div>
    </div>
  );
}