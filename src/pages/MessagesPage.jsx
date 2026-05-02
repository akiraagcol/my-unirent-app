import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Messages.css";

export default function MessagesPage() {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState(1);

  const contacts = [
    { id: 1, name: "Francis B.", lastMsg: "Is the Arduino still available?", time: "4m", online: true },
    { id: 2, name: "Jasmin L.", lastMsg: "I returned the sensor to Locker A1.", time: "20m", online: false },
    { id: 3, name: "Alex Hunt", lastMsg: "Hey! Important news!", time: "1h", online: true },
  ];

  return (
    <div className="messaging-wrapper">
      <header className="msg-header">
        <button className="back-btn" onClick={() => navigate("/profile")}>← Back to Profile</button>
        <h2>UniRent Messenger</h2>
      </header>

      <div className="msg-body">
        {/* SIDEBAR: Student List */}
        <aside className="msg-sidebar">
          {contacts.map((user) => (
            <div 
              key={user.id} 
              className={`contact-item ${activeChat === user.id ? "active" : ""}`}
              onClick={() => setActiveChat(user.id)}
            >
              <div className="avatar-small">👤</div>
              <div className="contact-info">
                <div className="name-row">
                  <span className="contact-name">{user.name}</span>
                  <span className="msg-time">{user.time}</span>
                </div>
                <p className="last-msg">{user.lastMsg}</p>
              </div>
            </div>
          ))}
        </aside>

        {/* MAIN CHAT AREA */}
        <main className="chat-window">
          <div className="chat-info-bar">
            <h3>{contacts.find(c => c.id === activeChat)?.name}</h3>
            <span className="online-status">Online</span>
          </div>

          <div className="chat-history">
            <div className="msg-bubble received">
              <p>Hey! I'm interested in renting your Arduino Uno.</p>
              <span className="timestamp">09:20 AM</span>
            </div>
            <div className="msg-bubble sent">
              <p>Sure! It's currently in Locker A1. I can provide the code once you pay.</p>
              <span className="timestamp">09:27 AM</span>
            </div>
            <div className="msg-bubble received">
              <p>Great! Sending the payment now. Thanks!</p>
              <span className="timestamp">09:30 AM</span>
            </div>
          </div>

          <footer className="chat-input-area">
            <input type="text" placeholder="Type a message..." />
            <button className="send-btn">Send</button>
          </footer>
        </main>
      </div>
    </div>
  );
}