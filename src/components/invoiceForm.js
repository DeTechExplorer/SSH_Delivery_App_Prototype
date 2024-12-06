import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo.jpeg';

function InvoiceForm() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        cardNumber: '',
        nameOnCard: '',
        expiryMonth: '',
        expiryYear: '',
        securityCode: '',
    });
 
    function handleChange(e) {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Form submitted:', formValues);
        
        if (formValues.cardNumber && formValues.nameOnCard && 
            formValues.expiryMonth && formValues.expiryYear && 
            formValues.securityCode) {
            localStorage.removeItem('checkoutData');
            navigate('/confirmation');
        }
    }

    return (
        <div style={styles.body}>
            <div style={styles.locationBar}>SSH Home Grocers</div>
            
            <div style={styles.logoContainer}>
                <img src={Logo} alt="Logo" style={styles.logoImg} />
            </div>

            <div style={styles.formWrapper}>
                <h2 style={styles.heading}>Invoice</h2>
                <div style={styles.cardBrands}>
                    <img src="/api/placeholder/50/50" alt="Visa" style={styles.brandImage} />
                    <img src="/api/placeholder/50/50" alt="MasterCard" style={styles.brandImage} />
                    <img src="/api/placeholder/50/50" alt="American Express" style={styles.brandImage} />
                    <img src="/api/placeholder/50/50" alt="JCB" style={styles.brandImage} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Card number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            maxLength="16"
                            pattern="\d{16}"
                            placeholder="1234567890123456"
                            value={formValues.cardNumber}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Name on card</label>
                        <input
                            type="text"
                            name="nameOnCard"
                            placeholder="Ex. John Webster"
                            value={formValues.nameOnCard}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Expiry Month</label>
                        <input
                            type="text"
                            name="expiryMonth"
                            maxLength="2"
                            placeholder="MM"
                            value={formValues.expiryMonth}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Expiry Year</label>
                        <input
                            type="text"
                            name="expiryYear"
                            maxLength="4"
                            placeholder="YYYY"
                            value={formValues.expiryYear}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Security code (CVV)</label>
                        <input
                            type="text"
                            name="securityCode"
                            maxLength="3"
                            placeholder="123"
                            value={formValues.securityCode}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.buttonContainer}>
                        <button 
                            type="button" 
                            style={styles.backButton}
                            onClick={() => navigate('/checkout')}
                        >
                            Back to Checkout
                        </button>
                        <button type="submit" style={styles.submitButton}>Pay</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

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
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
    },
    logoContainer: {
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        marginTop: "40px"
    },
    logoImg: {
        height: "110px",
        width: "110px",
        objectFit: "contain",
    },
    formWrapper: {
        backgroundColor: "#bde0fe",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        width: "400px",
        margin: "0 auto",
    },
    heading: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#3498db",
        fontSize: "24px",
        fontWeight: "bold",
    },
    cardBrands: {
        textAlign: "center",
        marginBottom: "20px",
    },
    brandImage: {
        width: "50px",
        margin: "0 5px",
    },
    formGroup: {
        marginBottom: "20px",
    },
    label: {
        color: "#2c3e50",
        fontSize: "14px",
        display: "block",
        marginBottom: "5px",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        padding: "12px",
        border: "2px solid #e0e0e0",
        borderRadius: "8px",
        fontSize: "16px",
        backgroundColor: "#ffffff",
        boxSizing: "border-box",
    },
    buttonContainer: {
        display: "flex",
        gap: "10px",
        marginTop: "25px",
    },
    backButton: {
        flex: "1",
        padding: "12px",
        backgroundColor: "#2c3e50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "background-color 0.3s",
    },
    submitButton: {
        flex: "1",
        padding: "12px",
        backgroundColor: "#3498db",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "background-color 0.3s",
    },
};

export default InvoiceForm;