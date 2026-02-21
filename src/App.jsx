import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';
import SignUpPage from './pages/SignUpPage'; 
import LoginPage from './pages/LoginPage';   
import RegistrationForm from './pages/RegistrationForm';
import Dashboard from './pages/Dashboard';
import RentalsPage from './pages/RentalsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-details" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rentals" element={<RentalsPage />} />
      </Routes>
    </Router>
  );
}

export default App;