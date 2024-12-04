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
    };
}