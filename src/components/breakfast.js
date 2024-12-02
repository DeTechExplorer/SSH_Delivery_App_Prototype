import React, { useState } from 'react';

function BreakfastPage() {
  const [cartCount, setCartCount] = useState(0);
  const [quantities, setQuantities] = useState({});

  const updateQuantity = (itemId, change) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  return (
    <>
      <div className="location-bar">
        SSH Delivery
      </div>
      <header className="top-bar">
        <div className="logo-search-location">
          <div id="logo">
            <img src="./images/WhatsApp Image 2024-11-27 at 9.58.28 AM.jpeg" alt="Logo" id="logo-img" />
          </div>
          <div id="search-box">
            <input type="text" placeholder="Search breakfast items..." />
          </div>
        </div>
        <div id="location-btn-container">
          <span id="location-text">Deliver to:</span>
          <button id="location-btn">SSH Home London, UK</button>
        </div>
      </header>
    </>
  );
}

export default BreakfastPage;
