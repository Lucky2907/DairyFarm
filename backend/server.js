const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Generate a unique order ID
const generateOrderId = () => {
    return 'ORD' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 4).toUpperCase();
};

// Send order notification email to retailer
const sendOrderNotification = async(orderData) => {
        const { customerDetails, items, total, paymentMethod, orderId } = orderData;

        const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.RETAILER_EMAIL,
                subject: `New Order Received - ${orderId}`,
                html: `
      <h2>New Order Received</h2>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Payment Method:</strong> ${paymentMethod}</p>
      <p><strong>Total Amount:</strong> ₹${total}</p>
      
      <h3>Customer Details:</h3>
      <p><strong>Name:</strong> ${customerDetails.name}</p>
      <p><strong>Email:</strong> ${customerDetails.email}</p>
      <p><strong>Phone:</strong> ${customerDetails.phone}</p>
      <p><strong>Address:</strong> ${customerDetails.address}</p>
      
      <h3>Order Items:</h3>
      <table style="border-collapse: collapse; width: 100%;">
        <tr style="background-color: #f2f2f2;">
          <th style="border: 1px solid #ddd; padding: 8px;">Item</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Total</th>
        </tr>
        ${items.map(item => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">₹${item.price}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">₹${item.price * item.quantity}</td>
          </tr>
        `).join('')}
      </table>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order notification email sent successfully');
  } catch (error) {
    console.error('Error sending order notification email:', error);
  }
};

// Send order confirmation email to customer
const sendOrderConfirmation = async (orderData) => {
  const { customerDetails, items, total, paymentMethod, orderId } = orderData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: customerDetails.email,
    subject: `Order Confirmation - ${orderId}`,
    html: `
      <h2>Thank you for your order!</h2>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Payment Method:</strong> ${paymentMethod}</p>
      <p><strong>Total Amount:</strong> ₹${total}</p>
      
      <h3>Order Items:</h3>
      <table style="border-collapse: collapse; width: 100%;">
        <tr style="background-color: #f2f2f2;">
          <th style="border: 1px solid #ddd; padding: 8px;">Item</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Total</th>
        </tr>
        ${items.map(item => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">₹${item.price}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">₹${item.price * item.quantity}</td>
          </tr>
        `).join('')}
      </table>
      
      <p>We will process your order shortly. ${paymentMethod === 'cod' ? 'Please keep the exact amount ready for delivery.' : ''}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};

// API endpoint to handle orders
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      orderId: generateOrderId()
    };

    // Send notification to retailer
    await sendOrderNotification(orderData);

    // Send confirmation to customer
    await sendOrderConfirmation(orderData);

    res.json({ 
      success: true, 
      orderId: orderData.orderId,
      message: 'Order placed successfully'
    });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process order'
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});