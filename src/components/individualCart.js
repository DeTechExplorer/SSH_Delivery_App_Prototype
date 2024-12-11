import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Logo from '../images/logo.jpeg';

const DELIVERY_FEE = 7.99;

function IndividualCartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [myItems, setMyItems] = useState([]); 

  useEffect(() => {
    const isPageRefresh = !sessionStorage.getItem('app_initialized');
    
    if (isPageRefresh) {
      // Clear cart on page refresh
      setMyItems([]);
      localStorage.removeItem('individualCartItems');
      sessionStorage.setItem('app_initialized', 'true');
    } else {
      // Load saved items if navigating normally
      const savedItems = JSON.parse(localStorage.getItem('individualCartItems') || '[]');
      setMyItems(savedItems);
    }
  }, []);

  const addToCart = (item) => {
    setMyItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      const updatedItems = existingItem
        ? prevItems.map(i => 
            i.id === item.id 
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...prevItems, { ...item, quantity: 1 }];

      localStorage.setItem('individualCartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };



  // IndividualCartPage.js

useEffect(() => {
  const savedItems = JSON.parse(localStorage.getItem('individualCartItems') || '[]');
  setMyItems(savedItems);
}, []);


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

  const handleCheckout = () => {
    const orderData = {
      items: myItems,
      totals: {
        subtotal: totals.itemsTotal,
        deliveryFee: totals.deliveryFee,
        total: totals.grandTotal
      },
      isSharedOrder: false
    };
  
    // Store checkout data without clearing cart
    localStorage.setItem('checkoutData', JSON.stringify(orderData));
    
    // Navigate to checkout without clearing cart
    navigate('/checkout');
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

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            display: grid;
            grid-template-columns: 1fr 350px;
            gap: 30px;
            margin-bottom: 80px;
          }

          .cart-section {
            width: 100%;
          }

          .items-container {
            max-height: 350px;
            overflow-y: auto;
            border: 5px solid white;
            box-shadow: 0 0 5px 2px rgba(26, 61, 109, 0.2);
            padding: 20px;
            background-color: #f9f9f9;
            margin-bottom: 30px;
            border-radius: 25px;
          }

          .cart-item {
            background-color: white;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 20px;
            transition: transform 0.3s ease;
          }

          .cart-item:hover {
            transform: scale(1.02);
          }

          .item-image {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            border: 3px solid #3498db;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .item-image img {
            width: 90%;
            height: 90%;
            object-fit: cover;
          }

          .item-details {
            flex-grow: 1;
          }

          .item-name {
            font-size: 18px;
            font-weight: bold;
            color: #2c3e50;
          }

          .item-price {
            color: #3498db;
            font-weight: bold;
            margin: 5px 0;
          }

          .quantity-counter {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 10px;
          }

          .quantity-btn {
            width: 24px;
            height: 24px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s;
          }

          .item-total {
            font-weight: bold;
            font-size: 18px;
            color: #2c3e50;
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

          .user-section {
            margin-bottom: 30px;
          }

          .user-header {
            color: #3498db;
            font-size: 18px;
            margin-bottom: 15px;
            padding-bottom: 5px;
            border-bottom: 2px solid #3498db;
          }

          .user-total {
            text-align: right;
            font-weight: bold;
            color: #2c3e50;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #eee;
          }

          @media (max-width: 1024px) {
            .container {
              grid-template-columns: 1fr;
            }
            
            .summary-section {
              position: relative;
              top: 0;
              width: 100%;
            }
          }

          @media (max-width: 768px) {
            .logo-search-location {
              flex-direction: column;
              gap: 10px;
            }

            .search-box input {
              width: 100%;
            }

            .cart-item {
              flex-direction: column;
              text-align: center;
            }

            .quantity-counter {
              justify-content: center;
            }
          }
             .frequent-items-section {
    background: white;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .frequent-items-section h3 {
    color: #3498db;
    margin: 0 0 15px 0;
    font-size: 18px;
  }

  .frequent-items-container {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding: 5px;
  }

  .frequent-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 100px;
  }

  .freq-item-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #3498db;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
  }

  .freq-item-image img {
    width: 90%;
    height: 90%;
    object-fit: cover;
  }

  .freq-add-btn {
    background: #3498db;
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
  }

  .freq-add-btn:hover {
    background: #2980b9;
  }

  @media (max-width: 768px) {
    .frequent-items-container {
      justify-content: flex-start;
    }
  }
`}
        
      </style>

      <div className="location-bar">
      SSH Home Delivers
      </div>

      <header className="top-bar">
        <div className="logo-search-location">
          <div id="logo">
            <img src={Logo} alt="Logo" id="logo-img" />
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


      <div className="frequent-items-section">
  <h3>Frequently Bought</h3>
  <div className="frequent-items-container">
    <div className="frequent-item">
      <div className="freq-item-image">
        <img src="https://i0.wp.com/daddioskitchen.com/wp-content/uploads/2022/12/IMG-4832.jpg?fit=3024%2C3024&ssl=1" alt="Bread" />
      </div>
      <button 
        className="freq-add-btn"
        onClick={() => addToCart({
          id: 'sourdough-bread',
          name: 'Sourdough Bread',
          price: 4.50,
          image: 'https://i0.wp.com/daddioskitchen.com/wp-content/uploads/2022/12/IMG-4832.jpg?fit=3024%2C3024&ssl=1'
        })}
      >
        Add
      </button>
    </div>

    <div className="frequent-item">
      <div className="freq-item-image">
        <img src="https://www.fruitsbox.ae/cdn/shop/products/BrownEggs30_528x.jpg?v=1613217638" alt="Eggs" />
      </div>
      <button 
        className="freq-add-btn"
        onClick={() => addToCart({
          id: 'fresh-eggs',
          name: 'Fresh Eggs',
          price: 3.99,
          image: 'https://www.fruitsbox.ae/cdn/shop/products/BrownEggs30_528x.jpg?v=1613217638'
        })}
      >
        Add
      </button>
    </div>

    <div className="frequent-item">
      <div className="freq-item-image">
        <img src="https://pngimg.com/d/bagel_PNG72.png" alt="Bagels" />
      </div>
      <button 
        className="freq-add-btn"
        onClick={() => addToCart({
          id: 'fresh-bagels',
          name: 'Fresh Bagels',
          price: 2.20,
          image: 'https://pngimg.com/d/bagel_PNG72.png'
        })}
      >
        Add
      </button>
    </div>
  </div>
</div>

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
          <button 
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={myItems.length === 0}
          style={{ 
            opacity: myItems.length === 0 ? '0.5' : '1',
            cursor: myItems.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          Continue to checkout →
        </button>
        </div>
      </div>

      <div className="bottom-nav">
        <button onClick={() => navigate('/categories')}>Categories</button>
        <button onClick={() => navigate('/')}>Home</button>
        <button id="cart-btn" data-testid = "cart-btn">
          <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Cart" />
          Cart
        </button>
      </div>
    </>
  );
}

export default IndividualCartPage;
