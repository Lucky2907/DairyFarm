import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import Payment from '../components/Payment';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart to see them here!</p>
      </div>
    );
  }

  if (showPayment) {
    return <Payment />;
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="price">₹{item.price}</p>
            </div>
            <div className="quantity-controls">
              <button
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <p className="item-total">₹{item.price * item.quantity}</p>
            <button
              className="remove-item"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total: ₹{getCartTotal()}</h2>
        <button 
          className="checkout-button"
          onClick={() => setShowPayment(true)}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Cart; 