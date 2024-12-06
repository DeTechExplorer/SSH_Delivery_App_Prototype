import React, { useState } from 'react';

function InvoiceForm() {
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

   const handleSubmit = (e) => {
       e.preventDefault();
       const { cardNumber, securityCode, expiryMonth, expiryYear } = formValues;

       // Validate card number: must be exactly 16 digits and numeric
       if (!/^\d{16}$/.test(cardNumber)) {
           alert('Card number must be exactly 16 digits and numeric. No letters are allowed.');
           return;
       }

       // Validate security code: must be exactly 3 digits
       if (!/^\d{3}$/.test(securityCode)) {
           alert('Security code must be exactly 3 digits and numeric.');
           return;
       }

       // Validate expiry month: must be numeric and between 01 and 12
       if (!/^\d{2}$/.test(expiryMonth) || parseInt(expiryMonth) < 1 || parseInt(expiryMonth) > 12) {
           alert('Expiry month must be a two-digit number between 01 and 12.');
           return;
       }

       // Validate expiry year: must be greater than or equal to 2024
       if (parseInt(expiryYear) < 2024) {
           alert('Expiry year must be 2024 or later.');
           return;
       }

       alert('Form submitted!');
   };

   return (
       <div style={styles.container}>
           <button style={styles.backButton} onClick={() => window.history.back()}>← Back</button>
           <div style={styles.formWrapper}>
               <h2 style={styles.heading}>Invoice</h2>
               <div style={styles.cardBrands}>
                   <img src="https://media.licdn.com/dms/image/v2/D4D12AQFAfaYxFXD-6g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1699642441151?e=2147483647&v=beta&t=ifgubpClH8kWjgGvN8y_ZyWpkvpRGBGxVpkrZXi8pXE" alt="Visa" style={styles.brandImage} />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png" alt="MasterCard" style={styles.brandImage} />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/2052px-American_Express_logo_%282018%29.svg.png" alt="American Express" style={styles.brandImage} />
                   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-TJ_yiPGULbS6OV-BcN3ZyVBcFscCPoMkYA&s" alt="JCB" style={styles.brandImage} />
               </div>
               <form onSubmit={handleSubmit}>
                   <div style={styles.formGroup}>
                   <label style={{ color: 'black', fontSize: '14px' }}>Card number</label>
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
                   <label style={{ color: 'black', fontSize: '14px' }}>Name on card</label>
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
                   <label style={{ color: 'black', fontSize: '14px' }}>Expiry Month</label>
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
                   <label style={{ color: 'black', fontSize: '14px' }}>Expiry Year</label>
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
                   <label style={{ color: 'black', fontSize: '14px' }}>Security code (CVV)</label>
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
                   <button type="submit" style={styles.button}>Next</button>
               </form>
           </div>
       </div>
   );
}

const styles = {
   container: {
       fontFamily: 'Arial, sans-serif',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       height: '100vh',
       backgroundColor: '#f4f4f4',
       margin: 0,
       position: 'relative',
   },
   backButton: {
       position: 'absolute',
       top: 20,
       left: 20,
       backgroundColor: '#007bff',
       color: 'white',
       border: 'none',
       borderRadius: '4px',
       padding: '10px 15px',
       cursor: 'pointer',
       textDecoration: 'none',
       transition: 'background-color 0.3s ease',
   },
   formWrapper: {
       background: 'white',
       padding: '30px',
       borderRadius: '8px',
       boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
       width: '400px',
   },
   heading: {
       textAlign: 'center',
       marginBottom: '20px',
   },
   cardBrands: {
       textAlign: 'center',
       marginBottom: '10px',
   },
   brandImage: {
       width: '50px',
       margin: '0 5px',
   },
   formGroup: {
       marginBottom: '20px',
   },
   input: {
       width: '100%',
       padding: '10px',
       border: '1px solid #ccc',
       borderRadius: '4px',
   },
   button: {
       width: '100%',
       padding: '12px',
       backgroundColor: '#007bff',
       color: 'white',
       border: 'none',
       borderRadius: '4px',
       cursor: 'pointer',
       transition: 'background-color 0.3s ease',
   },
};

export default InvoiceForm;