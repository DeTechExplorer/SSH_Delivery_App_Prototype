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

       
        if (!/^\d{16}$/.test(cardNumber)) {
            alert('Card number must be exactly 16 digits and numeric. No letters are allowed.');
            return;
        }

        
        if (!/^\d{3}$/.test(securityCode)) {
            alert('Security code must be exactly 3 digits and numeric.');
            return;
        }

    
        if (!/^\d{2}$/.test(expiryMonth) || parseInt(expiryMonth) < 1 || parseInt(expiryMonth) > 12) {
            alert('Expiry month must be a two-digit number between 01 and 12.');
            return;
        }

        
        if (parseInt(expiryYear) < 2024) {
            alert('Expiry year must be 2024 or later.');
            return;
        }

        alert('Form submitted!');
    }
       return (
           <div style={styles.container}>
               <button style={styles.backButton} onClick={() => window.history.back()}>← Back</button>
               <div style={styles.formWrapper}>
                   <h2>Invoice</h2>
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
       
    };
    
    
    export default InvoiceForm;
    
    