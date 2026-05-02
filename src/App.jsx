import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';
import SignUpPage from './pages/SignUpPage'; 
import RegistrationForm from './pages/RegistrationForm';
import Dashboard from './pages/Dashboard';
import RentalsPage from './pages/RentalsPage';
import ProfilePage from "./pages/ProfilePage";
import RentDetailsPage from './pages/RentDetailsPage';
import CartPage from './pages/CartPage';
import MessagesPage from './pages/MessagesPage'; // IMPORT THE NEW PAGE

function App() {
  // --- CART STATE ---
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('uniRentCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [toast, setToast] = useState(null);

  // --- SYSTEM NOTIFICATIONS STATE ---
  const [systemNotifications] = useState([
    { id: 1, text: "New component posted by Francis B.", time: "2m ago", type: "post", link: "/rentals" },
    { id: 2, text: "Your component received in Locker A1.", time: "10m ago", type: "locker", link: "/dashboard" },
    { id: 3, text: "Locker B3 has been closed.", time: "1h ago", type: "locker", link: "/dashboard" },
    { id: 4, text: "Arduino Uno R3 rented by John D.", time: "2h ago", type: "rent", link: "/dashboard" },
  ]);

  useEffect(() => {
    localStorage.setItem('uniRentCart', JSON.stringify(cart));
  }, [cart]);
  

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(null), 3000);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Router>
      {/* Toast for Add to Cart feedback */}
      {toast && <div className="toast-notification" role="alert">{toast}</div>}

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/register-details" element={<RegistrationForm />} />
        
        {/* Pass system notifications to Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <Dashboard 
              cartCount={cart.length} 
              notifications={systemNotifications} 
            />
          } 
        />
        
        <Route 
          path="/rentals" 
          element={<RentalsPage addToCart={addToCart} cartCount={cart.length} />} 
        />
        
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/rent-details" element={<RentDetailsPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
        
        {/* NEW MESSAGES ROUTE: This connects the Messages UI */}
        <Route path="/messages" element={<MessagesPage />} />
      </Routes>
    </Router>
  );
}

export default App;