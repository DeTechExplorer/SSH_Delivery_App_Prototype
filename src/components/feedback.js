import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo.jpeg';

const FeedbackForm = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [suggestions, setSuggestions] = useState('');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
        event.preventDefault();
        setShowToast(true);
        localStorage.removeItem('sharedCartItems');
        localStorage.removeItem('checkoutData');
        localStorage.setItem('isSharedOrder', 'false');
        setTimeout(() => {
            navigate('/categories', {
                state: { isSharedOrder: false }
            });
        }, 2000);
    };

        return (
            <div style={styles.body}>
                <div style={styles.locationBar}>SSH Home Delivers</div>
                
                <div style={styles.logoContainer}>
                    <img src={Logo} alt="Logo" style={styles.logoImg} />
                </div>
    
                <div style={styles.container}>
                    <div style={styles.feedbackBox}>
                        <h1 style={styles.heading}>Feedback</h1>
                        <p style={styles.description}>Please take a few minutes to do the feedback</p>
                        
                        <form onSubmit={handleSubmit}>
                            <div style={styles.question}>
                                <label style={styles.label}>How was your experience?</label>
                                <div style={styles.starRating}>
                                    {[...Array(5)].map((star, index) => {
                                        const ratingValue = index + 1;
                                        return (
                                            <label key={index}>
                                                <input 
                                                    type="radio"
                                                    name="rating"
                                                    value={ratingValue}
                                                    onClick={() => setRating(ratingValue)}
                                                    style={{ display: 'none' }}
                                                />
                                                <span 
                                                    style={{
                                                        ...styles.star,
                                                        color: ratingValue <= (hover || rating) ? '#3498db' : '#e4e5e9'
                                                    }}
                                                    onMouseEnter={() => setHover(ratingValue)}
                                                    onMouseLeave={() => setHover(0)}
                                                >
                                                    ★
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                            
                            <div style={styles.question}>
                                <label style={styles.label}>Any suggestions for improvement?</label>
                                <textarea
                                    value={suggestions}
                                    onChange={(e) => setSuggestions(e.target.value)}
                                    placeholder="Your suggestions here..."
                                    style={styles.textarea}
                                    rows={4}
                                />
                            </div>
                            
                            <div style={styles.submitSection}>
                                <button 
                                    type="submit" 
                                    style={styles.submitButton}
                                    disabled={rating === 0}
                                >
                                    Submit Feedback
                                </button>
                            </div>
                        </form>
                    </div>
    
                    {showToast && (
                        <div style={styles.toast}>
                            Feedback Submitted Successfully!
                        </div>
                    )}
                </div>
            </div>
        );
    };
    
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
        },
        logoContainer: {
            display: "flex",
            justifyContent: "center",
            padding: "20px",
        },
        logoImg: {
            height: "110px",
            width: "110px",
            objectFit: "contain",
        },
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            minHeight: "calc(100vh - 200px)",
            marginTop: "-50px",
        },
        feedbackBox: {
            backgroundColor: "#bde0fe",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            padding: "40px",
            textAlign: "center",
            width: "90%",
            maxWidth: "600px",
        },
        heading: {
            color: '#3498db',
            marginBottom: '10px',
            fontSize: '28px',
            fontWeight: 'bold',
        },
        description: {
            color: '#3498db',
            marginTop: '10px',
            fontSize: '18px',
        },
        question: {
            marginBottom: '30px',
        },
        label: {
            color: '#3498db',
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '10px',
            fontSize: '16px',
        },
        starRating: {
            display: 'flex',
            justifyContent: 'center',
            fontSize: '40px',
        },
        star: {
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'color 0.2s',
            margin: '0 5px',
        },
        textarea: {
            width: '100%',
            padding: '15px',
            border: '2px solid #3498db',
            borderRadius: '8px',
            resize: 'vertical',
            marginTop: '10px',
            boxSizing: 'border-box',
            fontSize: '16px',
        },
        submitSection: {
            marginTop: '30px',
        },
        submitButton: {
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
        },
        toast: {
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '15px',
            borderRadius: '4px',
            zIndex: 1000,
        }
    };

export default FeedbackForm;