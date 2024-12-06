import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [suggestions, setSuggestions] = useState('');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setShowToast(true);
      
      // Clear shared order data before redirecting
      localStorage.removeItem('sharedCartItems');
      localStorage.removeItem('checkoutData');
      
      // Set to individual order mode
      localStorage.setItem('isSharedOrder', 'false');
      
      setTimeout(() => {
          navigate('/categories', {
              state: { isSharedOrder: false }
          });
      }, 2000);
    };

    return (
      <div style={styles.container}>
        <div style={styles.feedbackContainer}>
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
    );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#e6f3ff',
  },
  feedbackContainer: {
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
    padding: '40px',
    textAlign: 'center',
    width: '500px',
    border: '3px solid #3498db',
  },
  heading: {
    color: '#3498db',
    marginBottom: '10px',
    fontSize: '24px',
  },
  description: {
    color: '#3498db',
    marginTop: '10px',
    fontSize: '16px',
  },
  question: {
    marginBottom: '20px',
  },
  label: {
    color: '#3498db',
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '10px',
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
    padding: '10px',
    border: '2px solid #3498db',
    borderRadius: '5px',
    resize: 'vertical',
    marginTop: '10px',
  },
  submitSection: {
    marginTop: '20px',
  },
  submitButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
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