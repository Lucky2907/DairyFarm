import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import '../styles/GooglePay.css';

const GooglePay = ({ onSuccess }) => {
  const { getCartTotal } = useCart();
  const [isGooglePayReady, setIsGooglePayReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load Google Pay API
    const script = document.createElement('script');
    script.src = 'https://pay.google.com/gp/p/js/pay.js';
    script.async = true;
    script.onload = () => {
      setIsGooglePayReady(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGooglePay = async () => {
    if (!window.google?.payments?.api) {
      setError('Google Pay API not loaded');
      return;
    }

    const client = new window.google.payments.api.PaymentsClient({
      environment: 'TEST', // Change to 'PRODUCTION' for live payments
    });

    const paymentDataRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA'],
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example', // Replace with your payment gateway
              gatewayMerchantId: 'exampleGatewayMerchantId', // Replace with your merchant ID
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: 'BCR2DN7TZDBKVYSE', // Your Google Pay merchant ID
        merchantName: 'Yogeshwar Dairy',
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: getCartTotal().toString(),
        currencyCode: 'INR',
        countryCode: 'IN',
      },
    };

    try {
      const paymentData = await client.loadPaymentData(paymentDataRequest);
      // Handle successful payment
      console.log('Payment successful:', paymentData);
      // Here you would typically send the payment data to your backend
      // to process the payment
      onSuccess();
    } catch (error) {
      if (error.statusCode === 'CANCELED') {
        console.log('Payment cancelled');
      } else {
        setError('Payment failed. Please try again.');
        console.error('Payment failed:', error);
      }
    }
  };

  if (!isGooglePayReady) {
    return <div>Loading Google Pay...</div>;
  }

  return (
    <div className="google-pay-container">
      {error && <div className="payment-error">{error}</div>}
      <button
        className="google-pay-button"
        onClick={handleGooglePay}
      >
        <img
          src="https://developers.google.com/static/identity/branding-guidelines/google-pay-mark.png"
          alt="Google Pay"
          className="google-pay-logo"
        />
        Pay ₹{getCartTotal()}
      </button>
    </div>
  );
};

export default GooglePay; 