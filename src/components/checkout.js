import React, { useState } from "react";
import logo from "../images/logo.jpeg";

const Checkout = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit-card");

  const handlePaymentMethodClick = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div>
      <div style={styles.locationBar}>SSH Delivery</div>

      <div style={styles.logoContainer}>
        <img src={logo} alt="SSH Logo" style={styles.logo} />
      </div>

      <div style={styles.checkoutContainer}>
        {/* Checkout Form */}
        <div style={styles.checkoutForm}>
          <h2 style={styles.heading}>Checkout</h2>
          <div style={styles.formGroup}>
            <label style={styles.label}>Contact Information</label>
            <input
              type="email"
              placeholder="Email address"
              style={{ ...styles.input, marginBottom: "10px" }}
            />
            <input type="tel" placeholder="Phone number" style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Payment Method</label>
            <div style={styles.paymentMethods}>
              <div
                style={{
                  ...styles.paymentMethod,
                  ...(selectedPaymentMethod === "credit-card" && styles.selectedMethod),
                }}
                onClick={() => handlePaymentMethodClick("credit-card")}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/39/39134.png"
                  alt="Credit Card"
                  style={styles.paymentIcon}
                />
                <div>
                  <strong>Credit / Debit Card</strong>
                  <div style={styles.methodDescription}>Visa and Mastercard</div>
                </div>
              </div>
              <div
                style={{
                  ...styles.paymentMethod,
                  ...(selectedPaymentMethod === "cod" && styles.selectedMethod),
                }}
                onClick={() => handlePaymentMethodClick("cod")}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9198/9198191.png"
                  alt="Cash on Delivery"
                  style={styles.paymentIcon}
                />
                <div>
                  <strong>Cash on Delivery</strong>
                  <div style={styles.methodDescription}>Pay with Cash on Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div style={styles.orderSummary}>
          <h2 style={styles.heading}>Order Summary</h2>
          <div style={styles.orderItem}>
            <span>Subtotal</span>
            <span style={styles.price}>£35.90</span>
          </div>
          <div style={styles.orderItem}>
            <span>Delivery Fee</span>
            <span style={styles.price}>£3.99</span>
          </div>
          <div style={styles.orderItem}>
            <span>Service Fee</span>
            <span style={styles.price}>£1.50</span>
          </div>

          <div style={styles.total}>
            <span>Total</span>
            <span style={styles.price}>£41.39</span>
          </div>

          <button
            style={styles.checkoutBtn}
            onClick={() => (window.location.href = "confirmation.html")}
          >
            Place Order
          </button>
          <button
            style={styles.backBtn}
            onClick={() => (window.location.href = "cart.html")}
          >
            &larr; Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  locationBar: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "10px",
    textAlign: "center",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px",
  },
  logo: {
    maxWidth: "130px",
    height: "auto",
  },
  checkoutContainer: {
    maxWidth: "1200px",
    margin: "20px auto",
    padding: "20px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
  },
  checkoutForm: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  heading: {
    color: "#000",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "2px solid #e0e0e0",
    borderRadius: "5px",
    fontSize: "16px",
  },
  paymentMethods: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
  paymentMethod: {
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    padding: "15px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  selectedMethod: {
    borderColor: "#3498db",
    backgroundColor: "#f0f9ff",
  },
  paymentIcon: {
    width: "40px",
    height: "40px",
    objectFit: "contain",
  },
  methodDescription: {
    fontSize: "14px",
    color: "#666",
  },
  orderSummary: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  orderItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  price: {
    fontWeight: "bold",
    color: "#000",
  },
  total: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
    fontWeight: "bold",
  },
  checkoutBtn: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "15px 30px",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
    width: "100%",
    marginTop: "20px",
  },
  backBtn: {
    backgroundColor: "#2c3e50",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "5px",
    marginTop: "20px",
  },
};

export default Checkout;
