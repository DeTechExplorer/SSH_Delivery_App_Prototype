import React from "react";
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo.jpeg';

const OrderConfirmation = () => {
    const navigate = useNavigate();
    
    const generateOrderNumber = () => {
      const prefix = "SSH-2024-";
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      return `${prefix}${randomDigits}`;
    };
    
    const orderNumber = generateOrderNumber();

    const handleContinueShopping = () => {
      navigate('/');  // Navigate to homepage
    };
  
    const handleLeaveFeedback = () => {
      navigate('/feedback');  // Navigate to feedback page
    };

  return (
     <div style={styles.body}>
        <div style={styles.locationBar}>SSH Home Grocers</div>
        
        <div style={styles.logoContainer}>
          <img src={Logo} alt="SSH Home Grocers Logo" style={styles.logoImg} />
        </div>

        <div style={styles.confirmationContainer}>
          <div style={styles.confirmationBox}>
            <div style={styles.confirmationIcon}>✓</div>
            <p style={styles.mainMessage}>Order Confirmed!</p>
            <p style={styles.subMessage}>
              Thank you for shopping with SSH Home Grocers. Your order is being prepared with care.
            </p>
            <div style={styles.orderNumber}>Order #{orderNumber}</div>
            <p style={styles.subMessage}>
              We'll send you an email with your order details and tracking information shortly.
            </p>
            <div style={styles.buttonContainer}>
              <button
                style={styles.button}
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
              <button
                style={{ ...styles.button, ...styles.secondaryButton }}
                onClick={handleLeaveFeedback}
              >
                Leave Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

// Inline styles
const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    color: "#2c3e50",
  },
  locationBar: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "10px",
    textAlign: "center",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center", // Centers the logo horizontally
    padding: "20px",           // Padding to give some space around the logo
  },
  
  logoImg: {
    height: "110px",
    width: "110px",
    objectFit: "contain",
  },
  confirmationContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    minHeight: "calc(100vh - 200px)",
    marginTop: "-50px",
  },
  confirmationBox: {
    backgroundColor: "#bde0fe",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "40px",
    textAlign: "center",
    width: "90%",
    maxWidth: "600px",
  },
  confirmationIcon: {
    width: "80px",
    height: "80px",
    backgroundColor: "#3498db",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    color: "white",
    fontSize: "40px",
  },
  mainMessage: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: "20px",
  },
  subMessage: {
    fontSize: "18px",
    marginBottom: "30px",
  },
  orderNumber: {
    backgroundColor: "#f0f4f8",
    padding: "15px",
    borderRadius: "8px",
    fontSize: "16px",
    margin: "20px 0",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginTop: "30px",
  },
  button: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "12px 30px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    textDecoration: "none",
  },
  secondaryButton: {
    backgroundColor: "#2c3e50",
  },
};

export default OrderConfirmation;