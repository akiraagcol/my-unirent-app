import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1, checked: true }];
    });
  };

  const removeFromCart = (productId) => setCartItems(prev => prev.filter(i => i.id !== productId));

  const updateQuantity = (productId, amount) => {
    setCartItems(prev =>
      prev
        .map(i => i.id === productId ? { ...i, quantity: i.quantity + amount } : i)
        .filter(i => i.quantity > 0)
    );
  };

  const toggleItemChecked = (productId) => {
    setCartItems(prev => prev.map(i => i.id === productId ? { ...i, checked: !i.checked } : i));
  };

  const toggleSelectAll = () => {
    const allChecked = cartItems.every(i => i.checked);
    setCartItems(prev => prev.map(i => ({ ...i, checked: !allChecked })));
  };

  const itemCount = useMemo(() => cartItems.reduce((s,i)=>s+i.quantity,0), [cartItems]);
  const totalPrice = useMemo(() => cartItems.reduce((s,i)=> i.checked ? s + (i.price||0)*i.quantity : s, 0), [cartItems]);
  const isAllChecked = useMemo(() => cartItems.length>0 && cartItems.every(i=>i.checked), [cartItems]);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity,
      toggleItemChecked, toggleSelectAll, itemCount, totalPrice, isAllChecked
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
