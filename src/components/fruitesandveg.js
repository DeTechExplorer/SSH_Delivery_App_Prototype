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

<style>
        {`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f4f8;
            color: #2c3e50;
          }

          .location-bar {
            background-color: #3498db;
            color: white;
            padding: 10px;
            text-align: center;
            position: sticky;
            top: 0;
            z-index: 100;
          }

          .top-bar {
            background-color: white;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 40px;
            z-index: 100;
          }

          .logo-search-location {
            display: flex;
            align-items: center;
            gap: 20px;
            flex-grow: 1;
            justify-content: center;
          }

          #logo-img {
            max-height: 130px;
          }

          #search-box input {
            width: 300px;
            padding: 10px;
            border: 2px solid #3498db;
            border-radius: 20px;
          }

          #location-btn-container {
            margin-left: auto;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          #location-text {
            font-size: 16px;
            color: #2c3e50;
          }

          #location-btn {
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          #location-btn:hover {
            background-color: #2980b9;
          }

          #fruits-section {
            text-align: center;
            padding: 20px;
            margin-bottom: 80px;
          }

          #fruits-section h2 {
            color: #3498db;
            margin-bottom: 20px;
          }

          .fruits-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            justify-content: center;
            gap: 20px;
            max-width: 1000px;
            margin: 0 auto;
          }

          .fruit-item {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 15px;
            text-align: center;
            transition: transform 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .fruit-item:hover {
            transform: scale(1.05);
          }

          .image-container {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid #3498db;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            position: relative;
          }

          .image-container img {
            width: 90%;
            height: 90%;
            object-fit: cover;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .quantity-counter {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 10px 0;
          }

          .quantity-btn {
            background-color: #3498db;
            color: white;
            border: none;
            width: 18px;
            height: 18px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s;
            padding: 0;
            line-height: 1;
          }

          .quantity-btn:hover {
            background-color: #2980b9;
          }

          .quantity-display {
            font-size: 14px;
            font-weight: bold;
            color: #2c3e50;
            min-width: 20px;
            text-align: center;
          }

          .fruit-item p {
            margin: 10px 0;
            color: #2c3e50;
            font-weight: bold;
          }

          .fruit-item .price {
            color: #3498db;
            font-size: 18px;
          }

          .fruit-item button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-top: 10px;
            width: 120px;
          }

          .fruit-item button:hover {
            background-color: #2980b9;
          }

          .bottom-nav {
            position: fixed;
            bottom: 0;
            width: 100%;
            background-color: white;
            display: flex;
            justify-content: space-around;
            padding: 10px;
            box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
            z-index: 100;
          }

          .bottom-nav button, #cart-btn {
            display: flex;
            align-items: center;
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
          }

          #cart-btn img {
            max-height: 20px;
            margin-right: 10px;
          }

          @media (max-width: 768px) {
            .fruits-container {
              grid-template-columns: repeat(2, 1fr);
            }
            
            .top-bar {
              flex-direction: column;
              gap: 10px;
            }

            #search-box input {
              width: 100%;
            }
          }

          @media (max-width: 480px) {
            .fruits-container {
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
      </style>

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

      <section id="fruits-section">
        <h2>Fruits & Vegetables</h2>
        <div className="fruits-container">
          <div className="fruit-item">
            <div className="image-container">
              <img src="/api/placeholder/130/130" alt="Banana" />
            </div>
            <p>Banana</p>
            <p className="price">£0.50 each</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('banana', -1)}>-</button>
              <span className="quantity-display">{quantities['banana'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('banana', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="fruit-item">
            <div className="image-container">
              <img src="/api/placeholder/130/130" alt="Apple" />
            </div>
            <p>Apple</p>
            <p className="price">£0.75 each</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('apple', -1)}>-</button>
              <span className="quantity-display">{quantities['apple'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('apple', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="fruit-item">
            <div className="image-container">
              <img src="/api/placeholder/130/130" alt="Orange" />
            </div>
            <p>Orange</p>
            <p className="price">£0.60 each</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('orange', -1)}>-</button>
              <span className="quantity-display">{quantities['orange'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('orange', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="fruit-item">
            <div className="image-container">
              <img src="/api/placeholder/130/130" alt="Strawberry" />
            </div>
            <p>Strawberry</p>
            <p className="price">£2.50 per punnet</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('strawberry', -1)}>-</button>
              <span className="quantity-display">{quantities['strawberry'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('strawberry', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="fruit-item">
            <div className="image-container">
              <img src="/api/placeholder/130/130" alt="Mango" />
            </div>
            <p>Mango</p>
            <p className="price">£1.20 each</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('mango', -1)}>-</button>
              <span className="quantity-display">{quantities['mango'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('mango', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="fruit-item">
            <div className="image-container">
              <img src="/api/placeholder/130/130" alt="Kiwi" />
            </div>
            <p>Kiwi</p>
            <p className="price">£0.80 each</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('kiwi', -1)}>-</button>
              <span className="quantity-display">{quantities['kiwi'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('kiwi', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="fruit-item">
            <div className="image-container">
              <img src="/api/placeholder/130/130" alt="Fresh Carrots" />
            </div>
            <p>Fresh Carrots</p>
            <p className="price">£0.90 per bunch</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('carrots', -1)}>-</button>
              <span className="quantity-display">{quantities['carrots'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('carrots', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="fruit-item">
            <div className="image-container">
              <img src="/api/placeholder/130/130" alt="Fresh Broccoli" />
            </div>
            <p>Fresh Broccoli</p>
            <p className="price">£1.25 per head</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('broccoli', -1)}>-</button>
              <span className="quantity-display">{quantities['broccoli'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('broccoli', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="fruit-item">
            <div className="image-container">
              <img src="/api/placeholder/130/130" alt="Baby Spinach" />
            </div>
            <p>Baby Spinach</p>
            <p className="price">£1.50 per bag</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('spinach', -1)}>-</button>
              <span className="quantity-display">{quantities['spinach'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('spinach', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="fruit-item">
            <div className="image-container">
              <img src="/api/placeholder/130/130" alt="Vine Tomatoes" />
            </div>
            <p>Vine Tomatoes</p>
            <p className="price">£2.20 per pack</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('tomatoes', -1)}>-</button>
              <span className="quantity-display">{quantities['tomatoes'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('tomatoes', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="fruit-item">
            <div className="image-container">
              <img src="/api/placeholder/130/130" alt="Mixed Bell Peppers" />
            </div>
            <p>Mixed Bell Peppers</p>
            <p className="price">£1.80 for 3</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('bell-peppers', -1)}>-</button>
              <span className="quantity-display">{quantities['bell-peppers'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('bell-peppers', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>

          <div className="fruit-item">
            <div className="image-container">
              <img src="/api/placeholder/130/130" alt="Cucumber" />
            </div>
            <p>Cucumber</p>
            <p className="price">£0.80 each</p>
            <div className="quantity-counter">
              <button className="quantity-btn" onClick={() => updateQuantity('cucumber', -1)}>-</button>
              <span className="quantity-display">{quantities['cucumber'] || 0}</span>
              <button className="quantity-btn" onClick={() => updateQuantity('cucumber', 1)}>+</button>
            </div>
            <button>Add to Cart</button>
          </div>
 </div>
          </section>

          <div className="bottom-nav">
        <button>Categories</button>
        <button>Home</button>
        <button id="cart-btn">
          <img src="/api/placeholder/20/20" alt="Cart" />
          Cart ({cartCount})
        </button>
      </div>
    </>
  );
}

export default FruitsPage;
