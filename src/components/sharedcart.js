import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Logo from '../images/logo.jpeg';


const DELIVERY_FEE = 7.99;
const SHARED_DISCOUNT = 0.75; // 75% discount for 4 people


function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSharedOrder, setIsSharedOrder] = useState(true);
  const [myItems, setMyItems] = useState([]); 


  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('sharedCartItems') || '[]');
    setMyItems(savedItems);
  }, []);

  // Group shared items by user
  const [sharedOrders] = useState({
    'John': [
      {
        id: 'sourdough-bread',
        name: 'Sourdough Bread',
        price: 4.50,
        quantity: 2,
        image: '/api/placeholder/130/130'
      },
      {
        id: 'organic-eggs',
        name: 'Organic Eggs',
        price: 3.99,
        quantity: 1,
        image: '/api/placeholder/130/130'
      }
    ],
    'Sarah': [
      {
        id: 'vanilla-cupcakes',
        name: 'Vanilla Cupcakes',
        price: 2.50,
        quantity: 6,
        image: '/api/placeholder/130/130'
      },
      {
        id: 'fresh-berries',
        name: 'Fresh Berries',
        price: 4.99,
        quantity: 2,
        image: '/api/placeholder/130/130'
      }
    ],
    'Mike': [
      {
        id: 'fresh-bagels',
        name: 'Fresh Bagels',
        price: 2.20,
        quantity: 4,
        image: '/api/placeholder/130/130'
      },
      {
        id: 'cream-cheese',
        name: 'Cream Cheese',
        price: 3.49,
        quantity: 1,
        image: '/api/placeholder/130/130'
      }
    ]
  });

  // Calculate initial cart count from shared orders
  const [cartCount, setCartCount] = useState(() => {
    return Object.values(sharedOrders).flat().reduce((sum, item) => sum + item.quantity, 0);
  });


  const updateQuantity = (itemType, itemId, change) => {
    if (itemType === 'my') {
      setMyItems(prevItems => {
        const updatedItems = prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        ).filter(item => item.quantity > 0);
        
        // Update cart count to include both dummy items and updated my items
        const dummyItemsCount = Object.values(sharedOrders).flat().reduce((sum, item) => sum + item.quantity, 0);
        const myItemsCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(dummyItemsCount + myItemsCount);
        
        return updatedItems;
      });
    }
  };

  const addToCart = (item) => {
    setMyItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    setCartCount(prev => prev + 1); // This will add to the existing count of dummy items
  };


  const calculateTotals = () => {
    const myTotal = myItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const sharedTotals = Object.entries(sharedOrders).reduce((acc, [person, items]) => {
      const personTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { ...acc, [person]: personTotal };
    }, {});

    const totalShared = Object.values(sharedTotals).reduce((sum, total) => sum + total, 0);
    const discountedDelivery = DELIVERY_FEE * SHARED_DISCOUNT;
    
    return {
      myTotal,
      sharedTotals,
      totalShared,
      deliveryFee: DELIVERY_FEE,
      discountedDelivery,
      finalDelivery: discountedDelivery,
      grandTotal: myTotal + totalShared + discountedDelivery
    };
  };

  const totals = calculateTotals();

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

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            display: flex;
            gap: 30px;
            margin-bottom: 80px;
            position: relative;
          }

          .cart-section {
            flex: 1;
            max-width: 70%;
          }

          .cart-section h1 {
            color: #3498db;
            font-size: 24px;
            margin-bottom: 10px;
          }

          .items-count {
            color: #2c3e50;
            margin-bottom: 20px;
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

          .items-container::-webkit-scrollbar {
            width: 8px;
          }

          .items-container::-webkit-scrollbar-thumb {
            background-color: #8d95a2;
            border-radius: 5px;
          }

          .items-container::-webkit-scrollbar-track {
            background-color: #f1f1f1;
            border-radius: 5px;
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

          .added-by {
            font-size: 14px;
            color: #3498db;
            margin-bottom: 5px;
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

          .quantity-btn:hover {
            background-color: #2980b9;
          }

          .quantity-display {
            font-weight: bold;
            min-width: 30px;
            text-align: center;
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
            position: fixed;
            top: 180px;
            right: calc((100vw - 1200px) / 2 + 20px);
            width: 350px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          @media (max-width: 1300px) {
            .summary-section {
              right: 20px;
            }
          }

          .summary-section h2 {
            color: #2c3e50;
            margin-bottom: 20px;
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

          .checkout-btn:hover {
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

          @media (max-width: 1024px) {
            .container {
              grid-template-columns: 1fr;
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
        
          .shared-order-badge {
            background-color: #2ecc71;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            display: inline-block;
            margin-top: 4px;
            font-size: 14px;
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

          .delivery-savings {
            background-color: #dff0d8;
            color: #3c763d;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
          }

          .user-total {
            text-align: right;
            font-weight: bold;
            color: #2c3e50;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #eee;
          }

      
          /* Updated styles */
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

          .summary-section {
            background-color: white;
            border-radius: 15px;
            padding: 20px;
            height: fit-content;
            position: sticky;
            top: 180px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

          @media (max-width: 1024px) {
            .container {
              grid-template-columns: 1fr;
            }
            
            .summary-section {
              position: relative;
              top: 0;
              width: 100%;
            
          }
        `}
      </style>

       

      <div className="location-bar">
        SSH Delivery
        <div className="shared-order-badge">
          Shared Order Active with 3 participants
        </div>
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
            {myItems.reduce((sum, item) => sum + item.quantity, 0) + 
             Object.values(sharedOrders).flat().reduce((sum, item) => sum + item.quantity, 0)} Items
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
                        <button className="quantity-btn" onClick={() => updateQuantity('my', item.id, -1)}>-</button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button className="quantity-btn" onClick={() => updateQuantity('my', item.id, 1)}>+</button>
                      </div>
                    </div>
                    <div className="item-total">£{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
            {myItems.length > 0 && (
              <div className="user-total">
                My Total: £{totals.myTotal.toFixed(2)}
              </div>
            )}
          </div>

          <h2 className="user-header" style={{ marginTop: '30px' }}>Other Participants' Items</h2>
          {Object.entries(sharedOrders).map(([person, items]) => (
            <div key={person} className="user-section">
              <h3 className="user-header" style={{ fontSize: '16px' }}>{person}'s Items</h3>
              <div className="items-container">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">£{item.price.toFixed(2)} / piece</div>
                      <div className="quantity-counter">
                        <span className="quantity-display">{item.quantity}</span>
                      </div>
                    </div>
                    <div className="item-total">£{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="user-total">
                {person}'s Total: £{totals.sharedTotals[person].toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="summary-section">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>My Items Total</span>
            <span>£{totals.myTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shared Items Total</span>
            <span>£{totals.totalShared.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>£{totals.deliveryFee.toFixed(2)}</span>
          </div>
          <div className="delivery-savings">
            <span>75% Off Delivery Fee Savings</span>
            <span>-£{(totals.deliveryFee - totals.discountedDelivery).toFixed(4)}</span>
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

export default CartPage;