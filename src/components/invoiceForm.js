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
    
    const [errors, setErrors] = useState({
        cardNumber: '',
        nameOnCard: '',
        expiryMonth: '',
        expiryYear: '',
        securityCode: '',
    });
 
    function handleChange(e) {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }

        // Validate month as user types
        if (name === 'expiryMonth') {
            if (value && (parseInt(value) < 1 || parseInt(value) > 12)) {
                setErrors(prev => ({
                    ...prev,
                    expiryMonth: 'Please match the requested format.'
                }));
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { cardNumber, nameOnCard, expiryMonth, expiryYear, securityCode } = formValues;
        let newErrors = {
            cardNumber: '',
            nameOnCard: '',
            expiryMonth: '',
            expiryYear: '',
            securityCode: '',
        };
        let hasErrors = false;

        // Validate card number: must be exactly 16 digits and numeric
        if (!/^\d{16}$/.test(cardNumber)) {
            newErrors.cardNumber = 'Please match the requested format.';
            hasErrors = true;
        }

        // Validate security code: must be exactly 3 digits
        if (!/^\d{3}$/.test(securityCode)) {
            newErrors.securityCode = 'Please match the requested format.';
            hasErrors = true;
        }

        // Validate expiry month: must be numeric and between 01 and 12
        const monthNum = parseInt(expiryMonth);
        if (!expiryMonth || !/^\d{1,2}$/.test(expiryMonth) || monthNum < 1 || monthNum > 12) {
            newErrors.expiryMonth = 'Please match the requested format.';
            hasErrors = true;
        }

        // Validate expiry year: must be greater than or equal to 2024
        if (parseInt(expiryYear) < 2024) {
            newErrors.expiryYear = 'Please match the requested format.';
            hasErrors = true;
        }

        setErrors(newErrors);
        
        if (!hasErrors) {
            localStorage.removeItem('checkoutData');
            navigate('/confirmation');
        }
    }

    return (
        <div style={styles.body}>
            <div style={styles.locationBar}>SSH Home Delivers</div>
            
            <div style={styles.logoContainer}>
                <img src={Logo} alt="Logo" style={styles.logoImg} />
            </div>

            <div style={styles.formWrapper}>
                <h2 style={styles.heading}>Invoice</h2>
                <div style={styles.cardBrands}>
                    <img src="/api/placeholder/50/30" alt="Visa" style={styles.brandImage} />
                    <img src="/api/placeholder/50/30" alt="MasterCard" style={styles.brandImage} />
                    <img src="/api/placeholder/50/30" alt="American Express" style={styles.brandImage} />
                    <img src="/api/placeholder/50/30" alt="JCB" style={styles.brandImage} />
                </div>
                <form onSubmit={handleSubmit} noValidate>
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
                        {errors.cardNumber && (
                            <div style={styles.errorBubble}>
                                <span style={styles.errorIcon}>!</span>
                                {errors.cardNumber}
                            </div>
                        )}
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
                        {errors.nameOnCard && (
                            <div style={styles.errorBubble}>
                                <span style={styles.errorIcon}>!</span>
                                {errors.nameOnCard}
                            </div>
                        )}
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
                        {errors.expiryMonth && (
                            <div style={styles.errorBubble}>
                                <span style={styles.errorIcon}>!</span>
                                {errors.expiryMonth}
                            </div>
                        )}
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
                        {errors.expiryYear && (
                            <div style={styles.errorBubble}>
                                <span style={styles.errorIcon}>!</span>
                                {errors.expiryYear}
                            </div>
                        )}
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
                        {errors.securityCode && (
                            <div style={styles.errorBubble}>
                                <span style={styles.errorIcon}>!</span>
                                {errors.securityCode}
                            </div>
                        )}
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
        position: "relative",
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
    errorBubble: {
        position: "absolute",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "8px 12px",
        marginTop: "4px",
        fontSize: "14px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        zIndex: 1,
    },
    errorIcon: {
        backgroundColor: "#f0ad4e",
        color: "white",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: "bold",
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