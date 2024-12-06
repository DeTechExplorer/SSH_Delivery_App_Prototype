import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InvoiceForm() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        cardNumber: '',
        nameOnCard: '',
        expiryMonth: '',
        expiryYear: '',
        securityCode: '',
    });
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

   return (
       <div style={styles.container}>
           <div style={styles.locationBar}>SSH Home Grocers</div>
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
                       <button type="button" style={styles.backButton} onClick={() => navigate('/checkout')}>
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
   locationBar: {
       backgroundColor: '#3498db',
       color: 'white',
       padding: '10px',
       textAlign: 'center',
       width: '100%',
       position: 'fixed',
       top: 0,
       left: 0,
       zIndex: 1000,
   },
   container: {
       fontFamily: 'Arial, sans-serif',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       minHeight: '100vh',
       backgroundColor: '#ffffff',
       margin: 0,
       paddingTop: '60px',
   },
   formWrapper: {
       background: '#bde0fe',
       padding: '30px',
       borderRadius: '10px',
       boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
       width: '400px',
       margin: '20px',
   },
   heading: {
       textAlign: 'center',
       marginBottom: '20px',
       color: '#3498db',
       fontSize: '28px',
       fontWeight: 'bold',
   },
   cardBrands: {
       textAlign: 'center',
       marginBottom: '20px',
   },
   brandImage: {
       width: '50px',
       margin: '0 5px',
   },
   formGroup: {
       marginBottom: '20px',
   },
   label: {
       color: '#2c3e50',
       fontSize: '14px',
       display: 'block',
       marginBottom: '5px',
   },
   input: {
       width: '100%',
       padding: '10px',
       border: '1px solid #ccc',
       borderRadius: '4px',
       boxSizing: 'border-box',
   },
   buttonContainer: {
       display: 'flex',
       gap: '10px',
       marginTop: '20px',
   },
   backButton: {
       flex: '1',
       padding: '12px',
       backgroundColor: '#2c3e50',
       color: 'white',
       border: 'none',
       borderRadius: '4px',
       cursor: 'pointer',
       transition: 'background-color 0.3s ease',
   },
   submitButton: {
       flex: '1',
       padding: '12px',
       backgroundColor: '#3498db',
       color: 'white',
       border: 'none',
       borderRadius: '4px',
       cursor: 'pointer',
       transition: 'background-color 0.3s ease',
   },
};

export default InvoiceForm;