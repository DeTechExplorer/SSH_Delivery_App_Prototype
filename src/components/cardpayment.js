import React from 'react';

function InvoiceForm() {
    return (
        <div style={styles.container}>
            <h2>Invoice</h2>
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
    },
};

export default InvoiceForm;
