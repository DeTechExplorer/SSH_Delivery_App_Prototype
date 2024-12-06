import React, { useState } from 'react';

const styles = {
   container: {
       fontFamily: 'Arial, sans-serif',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       height: '100vh',
       backgroundColor: '#f4f4f4',
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
   },
   formWrapper: {
       background: 'white',
       padding: '30px',
       borderRadius: '8px',
       boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
       width: '400px',
   },
   input: {
       width: '100%',
       padding: '10px',
       border: '1px solid #ccc',
       borderRadius: '4px',
   },
};

function InvoiceForm() {
   const [formValues, setFormValues] = useState({
       cardNumber: '',
   });

   const handleChange = (e) => {
       const { name, value } = e.target;
       setFormValues({ ...formValues, [name]: value });
   };

   return (
       <div style={styles.container}>
           <button style={styles.backButton} onClick={() => window.history.back()}>
               ← Back
           </button>
           <div style={styles.formWrapper}>
               <h2>Invoice</h2>
               <div style={{ marginBottom: '20px' }}>
                   <label style={{ color: 'black', fontSize: '14px' }}>Card number</label>
                   <input
                       type="text"
                       name="cardNumber"
                       placeholder="1234567890123456"
                       value={formValues.cardNumber}
                       onChange={handleChange}
                       style={styles.input}
                   />
               </div>
           </div>
       </div>
   );
}

export default InvoiceForm;
