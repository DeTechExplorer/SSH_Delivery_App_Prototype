import React, { useState } from 'react';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [suggestions, setSuggestions] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const feedback = { rating, suggestions };
    console.log(feedback);
  };

  return (
    <div>
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
      </form>
    </div>
  );
};

export default FeedbackForm;