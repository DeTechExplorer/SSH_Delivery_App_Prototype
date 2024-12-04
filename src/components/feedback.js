import React, { useState } from 'react';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [suggestions, setSuggestions] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const feedback = { rating, suggestions };
    console.log(feedback);
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
                        color: 
                          ratingValue <= (hover || rating) 
                            ? '#3498db' 
                            : '#e4e5e9'
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
          
        
        </form>
      </div>
    </div>
  );
};


export default FeedbackForm;