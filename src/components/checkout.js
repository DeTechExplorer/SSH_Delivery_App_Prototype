import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo.jpeg';

const Checkout = () => {
    const navigate = useNavigate();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit-card");
    const [orderData, setOrderData] = useState(null);
  
    useEffect(() => {
      const savedOrderData = localStorage.getItem('checkoutData');
      if (!savedOrderData) {
        navigate('/cart');
      }
      setOrderData(JSON.parse(savedOrderData));
    }, [navigate]);

    const handlePaymentMethodClick = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handlePlaceOrder = () => {
        if (selectedPaymentMethod === 'credit-card') {
            navigate('/invoice');
            return;
        }
        
        if (orderData?.isSharedOrder) {
            localStorage.removeItem('sharedCartItems');
        } else {
            localStorage.removeItem('individualCartItems');
        }
        localStorage.removeItem('checkoutData');
        
        navigate('/confirmation');
    };

    if (!orderData) return null;

    return (
        <div style={styles.body}>
            <div style={styles.locationBar}>
            SSH Home Delivers
                {orderData.isSharedOrder && (
                    <div style={{ 
                        backgroundColor: '#2ecc71', 
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        marginTop: '4px',
                        fontSize: '14px'
                    }}>
                        Shared Order with {orderData.sharedOrderDetails?.totalParticipants} participants
                    </div>
                )}
            </div>
            
            <div style={styles.logoContainer}>
                <img src={Logo} alt="Logo" style={styles.logoImg} />
            </div>
    
            <div style={styles.mainContainer}>
                <div style={styles.checkoutForm}>
                    <h2 style={styles.heading}>Checkout</h2>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Contact Information</label>
                        <input
                            type="email"
                            placeholder="Email address"
                            style={{ ...styles.input, marginBottom: "10px" }}
                        />
                        <input 
                            type="tel" 
                            placeholder="Phone number" 
                            style={styles.input} 
                        />
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
                                    src="/api/placeholder/40/40"
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
                                    ...(selectedPaymentMethod === "apple-pay" && styles.selectedMethod),
                                }}
                                onClick={() => handlePaymentMethodClick("apple-pay")}
                            >
                                <img
                                    src="/api/placeholder/40/40"
                                    alt="Apple Pay"
                                    style={styles.paymentIcon}
                                />
                                <div>
                                    <strong>Apple Pay</strong>
                                    <div style={styles.methodDescription}>Quick and secure payment</div>
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
                                    src="/api/placeholder/40/40"
                                    alt="Cash on Delivery"
                                    style={styles.paymentIcon}
                                />
                                <div>
                                    <strong>Cash on Delivery</strong>
                                    <div style={styles.methodDescription}>Pay when you receive</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div style={styles.orderSummary}>
                    <h2 style={styles.heading}>Order Summary</h2>
                    <div style={styles.orderItem}>
                        <span>Subtotal</span>
                        <span style={styles.price}>£{orderData.totals.subtotal.toFixed(2)}</span>
                    </div>
                    <div style={styles.orderItem}>
                        <span>Delivery Fee</span>
                        <span style={styles.price}>£{orderData.totals.deliveryFee.toFixed(2)}</span>
                    </div>
    
                    {orderData.isSharedOrder && (
                        <div style={styles.sharedOrderInfo}>
                            <div style={styles.deliverySavings}>
                                <span>Shared order savings applied!</span>
                            </div>
                        </div>
                    )}
    
                    <div style={styles.total}>
                        <span>Total to Pay</span>
                        <span style={styles.price}>£{orderData.totals.total.toFixed(2)}</span>
                    </div>
    
                    {orderData.isSharedOrder && (
                        <div style={styles.sharedTotalInfo}>
                            <div style={styles.orderItem}>
                                <span>Total Order Value</span>
                                <span style={styles.price}>
                                    £{orderData.sharedOrderDetails.totalOrderValue.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    )}
    
                    <div style={styles.buttonContainer}>
                        <button
                            style={styles.button}
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </button>
                        <button
                            style={{ ...styles.button, ...styles.secondaryButton }}
                            onClick={() => navigate(-1)}
                        >
                            Back to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
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
      justifyContent: "center",
      padding: "20px",
    },
    logoImg: {
      height: "110px",
      width: "110px",
      objectFit: "contain",
    },
    mainContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "30px",
      marginTop: "-20px",
    },
    checkoutForm: {
      backgroundColor: "#bde0fe",
      borderRadius: "10px",
      padding: "30px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    heading: {
      color: "#3498db",
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
    },
    formGroup: {
      marginBottom: "25px",
    },
    label: {
      display: "block",
      marginBottom: "10px",
      fontWeight: "bold",
      color: "#2c3e50",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "2px solid #e0e0e0",
      borderRadius: "8px",
      fontSize: "16px",
      backgroundColor: "#ffffff",
    },
    paymentMethods: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    paymentMethod: {
      backgroundColor: "#ffffff",
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
      marginTop: "4px",
    },
    orderSummary: {
      backgroundColor: "#bde0fe",
      borderRadius: "10px",
      padding: "30px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      height: "fit-content",
    },
    orderItem: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "15px",
      color: "#2c3e50",
    },
    price: {
      fontWeight: "bold",
      color: "#2c3e50",
    },
    total: {
      borderTop: "2px solid #3498db",
      marginTop: "20px",
      paddingTop: "20px",
      display: "flex",
      justifyContent: "space-between",
      fontSize: "20px",
      fontWeight: "bold",
      color: "#2c3e50",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      marginTop: "25px",
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
      textAlign: "center",
      fontWeight: "bold",
      transition: "background-color 0.3s",
    },
    secondaryButton: {
      backgroundColor: "#2c3e50",
    }
  };
  

export default Checkout;