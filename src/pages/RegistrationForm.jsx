import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    birthday: "",
    department: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setIsLoading(true);

    try {
      // Updated to your MacBook's network IP
      const response = await fetch("http://192.168.5.95:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Task 4 & 6: Ensure data keys match the backend's expected request.data
          username: formData.fullName.replace(/\s+/g, '').toLowerCase(),
          password: formData.password,
          full_name: formData.fullName, // matches data.get('full_name') in fixed views.py
          department: formData.department,
          birthday: formData.birthday
        }),
      });

      if (response.ok) {
        // Task 8: Success message handling
        alert("Success!");
        navigate("/login");
      } else {
        const data = await response.json();
        // Task 8: Error message handling
        alert(data.error || "Registration failed.");
      }
    } catch (error) {
      alert("Network error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="welcome-container">
      <form onSubmit={handleSubmit}>
        <input 
          name="fullName" 
          placeholder="Full Name" 
          required 
          onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
        />
        <input 
          name="birthday" 
          type="date" 
          required 
          onChange={(e) => setFormData({...formData, birthday: e.target.value})} 
        />
        <select 
          name="department" 
          required 
          onChange={(e) => setFormData({...formData, department: e.target.value})}
        >
          <option value="">Select Department</option>
          <option value="CIT">CIT</option>
          <option value="CEA">CEA</option>
        </select>
        <input 
          name="password" 
          type="password" 
          required 
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
        />
        <input 
          name="confirmPassword" 
          type="password" 
          required 
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
        />
        
        {/* CRITICAL: type="submit" trigger for form submission */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Register"}
        </button>
      </form>
    </div>
  );
}