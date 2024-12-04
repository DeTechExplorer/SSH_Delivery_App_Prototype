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
}