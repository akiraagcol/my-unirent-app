import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WelcomePage from './pages/WelcomePage';
import SignUpPage from './pages/SignUpPage'; 
import Dashboard from './pages/Dashboard';
import RentalsPage from './pages/RentalsPage';
import ProfilePage from "./pages/ProfilePage";
import RentDetailsPage from './pages/RentDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage'; 

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('uniRentCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('uniRentCart', JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setToast(`${product.title || product.name || 'Item'} added to cart!`);
    setTimeout(() => setToast(null), 3000);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      {toast && <div className="toast-notification" role="alert">{toast}</div>}

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Removed notifications prop */}
        <Route path="/dashboard" element={<Dashboard cartCount={cart.length} />} />
        
        <Route path="/rentals" element={<RentalsPage addToCart={addToCart} cartCount={cart.length} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/rent-details" element={<RentDetailsPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} clearCart={clearCart} />} />
      </Routes>
    </Router>
  );
}

export default App;