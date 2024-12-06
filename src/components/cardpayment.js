import React, { useState } from 'react';

function InvoiceForm() {
    const [formValues, setFormValues] = useState({
        cardNumber: '',
        nameOnCard: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <h2>Invoice</h2>
                <form>
                    <div style={styles.formGroup}>
                        <label>Card number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            maxLength="16"
                            value={formValues.cardNumber}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Name on card</label>
                        <input
                            type="text"
                            name="nameOnCard"
                            value={formValues.nameOnCard}
                            onChange={handleChange}
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
    },
    formWrapper: {
        background: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '400px',
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
