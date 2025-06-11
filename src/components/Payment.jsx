import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import GooglePay from './GooglePay';
import '../styles/Payment.css';

const Payment = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to COD
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const orderData = {
        customerDetails,
        items: cart,
        total: getCartTotal(),
        paymentMethod,
        orderDate: new Date().toISOString()
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const data = await response.json();
      setOrderDetails(data);
      setSuccess(true);
      clearCart();
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <div className="payment-container">
        <div className="payment-success">
          <h2>Order Placed Successfully!</h2>
          <p>Order ID: {orderDetails?.orderId}</p>
          <p>Thank you for your order. {paymentMethod === 'cod' ? 'You will receive a confirmation email shortly.' : 'Your payment has been processed successfully.'}</p>
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="order-total">
              <strong>Total:</strong>
              <strong>₹{getCartTotal()}</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-form">
        <h2>Complete Your Order</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerDetails.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={customerDetails.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              name="address"
              value={customerDetails.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="payment-methods">
            <h3>Select Payment Method</h3>
            <div className="payment-method-tabs">
              <button
                type="button"
                className={`payment-method-tab ${paymentMethod === 'cod' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('cod')}
              >
                Cash on Delivery
              </button>
              <button
                type="button"
                className={`payment-method-tab ${paymentMethod === 'gpay' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('gpay')}
              >
                Google Pay
              </button>
            </div>
          </div>

          {paymentMethod === 'gpay' && (
            <div className="gpay-container">
              <GooglePay onSuccess={() => handleSubmit(new Event('submit'))} />
            </div>
          )}

          {error && <div className="payment-error">{error}</div>}

          {paymentMethod === 'cod' && (
            <button type="submit" className="submit-button">
              Place Order
            </button>
          )}
        </form>
      </div>

      <div className="payment-summary">
        <h3>Order Summary</h3>
        {cart.map(item => (
          <div key={item.id} className="payment-item">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="payment-total">
          <strong>Total:</strong>
          <strong>₹{getCartTotal()}</strong>
        </div>
      </div>
    </div>
  );
};

export default Payment; 