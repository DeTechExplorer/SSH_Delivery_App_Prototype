import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo.jpeg';

const DELIVERY_FEE = 7.99;

function IndividualCartPage() {
  const navigate = useNavigate();
  const [myItems, setMyItems] = useState([]); 

  const updateQuantity = (itemId, change) => {
    setMyItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0);
      return updatedItems;
    });
  };

  const calculateTotal = () => {
    const itemsTotal = myItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
      itemsTotal,
      deliveryFee: DELIVERY_FEE,
      grandTotal: itemsTotal + DELIVERY_FEE
    };
  };

  const totals = calculateTotal();

  return (
    <>
      <style>
        {/* Keep all your existing styles */}
        {`
          /* Your existing styles */
          .cart-section {
            width: 100%;
          }

          .summary-section {
            background-color: white;
            border-radius: 15px;
            padding: 20px;
            height: fit-content;
            position: sticky;
            top: 180px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          /* Container for grid layout */
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            display: grid;
            grid-template-columns: 1fr 350px;
            gap: 30px;
            margin-bottom: 80px;
          }

          .empty-cart-message {
            text-align: center;
            padding: 40px;
            background-color: white;
            border-radius: 10px;
            margin: 20px 0;
          }

          .empty-cart-message h3 {
            color: #3498db;
            margin-bottom: 10px;
          }

          .empty-cart-message p {
            color: #7f8c8d;
            margin-bottom: 20px;
          }

          .start-shopping-btn {
            background-color: #3498db;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s;
          }

          .start-shopping-btn:hover {
            background-color: #2980b9;
          }

          /* Add any missing styles */
          .summary-section {
            background-color: white;
            border-radius: 15px;
            padding: 20px;
            height: fit-content;
            position: sticky;
            top: 180px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            color: #2c3e50;
          }

          .summary-divider {
            height: 1px;
            background-color: #e0e0e0;
            margin: 15px 0;
          }

          .total-row {
            font-size: 20px;
            font-weight: bold;
          }

          .checkout-btn {
            width: 100%;
            padding: 12px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-top: 20px;
          }
        `}
      </style>

      <div className="location-bar">
        SSH Delivery
      </div>

      <header className="top-bar">
        <div className="logo-search-location">
          <div id="logo">
            <img src="/api/placeholder/130/130" alt="Logo" id="logo-img" />
          </div>
          <div id="search-box">
            <input type="text" placeholder="Search items..." />
          </div>
        </div>
        <div id="location-btn-container">
          <span id="location-text">Deliver to:</span>
          <button id="location-btn">SSH Home London, UK</button>
        </div>
      </header>

      <div className="container">
        <div className="cart-section">
          <h1>Shopping Cart</h1>
          <p className="items-count">
            {myItems.reduce((sum, item) => sum + item.quantity, 0)} Items
          </p>

          <div className="user-section">
            <h2 className="user-header">My Items</h2>
            {myItems.length === 0 ? (
              <div className="empty-cart-message">
                <h3>Your cart is empty</h3>
                <p>Add items from categories to start your order</p>
                <button 
                  className="start-shopping-btn"
                  onClick={() => navigate('/categories')}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="items-container">
                {myItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">£{item.price.toFixed(2)} / piece</div>
                      <div className="quantity-counter">
                        <button className="quantity-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button className="quantity-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                    </div>
                    <div className="item-total">£{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
            {myItems.length > 0 && (
              <div className="user-total">
                Subtotal: £{totals.itemsTotal.toFixed(2)}
              </div>
            )}
          </div>
        </div>

        <div className="summary-section">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Items Total</span>
            <span>£{totals.itemsTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>£{totals.deliveryFee.toFixed(2)}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>£{totals.grandTotal.toFixed(2)}</span>
          </div>
          <button className="checkout-btn">
            Continue to checkout →
          </button>
        </div>
      </div>

      <div className="bottom-nav">
        <button onClick={() => navigate('/categories')}>Categories</button>
        <button onClick={() => navigate('/')}>Home</button>
        <button id="cart-btn">
          <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Cart" />
          Cart
        </button>
      </div>
    </>
  );
}

export default IndividualCartPage;