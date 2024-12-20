import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Logo from '../images/logo.jpeg';


const DELIVERY_FEE = 7.99;
const SHARED_DISCOUNT = 1.99; // 75% discount for 4 people


function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSharedOrder, setIsSharedOrder] = useState(true);
  const [myItems, setMyItems] = useState([]);
  const [showCheckoutNotification, setShowCheckoutNotification] = useState(true);
  const [hasSeenCheckoutNotification, setHasSeenCheckoutNotification] = useState(false);
  const [showRemovedNotification, setShowRemovedNotification] = useState(false);
  
// Replace the existing notification useEffect with this:
useEffect(() => {
  // Using sessionStorage instead of localStorage
  const notificationSeen = sessionStorage.getItem('checkoutNotificationSeen');
  
  if (notificationSeen) {
    setShowCheckoutNotification(false);
    setHasSeenCheckoutNotification(true);
  }
}, []);

   // Initial loading of cart items and shared order state
   useEffect(() => {
    try {
      // Set shared order state
      localStorage.setItem('isSharedOrder', 'true');
      setIsSharedOrder(true);

      // Load saved cart items
      const savedItems = JSON.parse(localStorage.getItem('sharedCartItems') || '[]');
      console.log('Loading saved items:', savedItems); // Debug log
      setMyItems(savedItems);
    } catch (error) {
      console.error('Error loading cart items:', error);
      setMyItems([]);
    }
  }, []); 

  // Save cart items whenever they change
  useEffect(() => {
    if (myItems && myItems.length > 0) {
      localStorage.setItem('sharedCartItems', JSON.stringify(myItems));
      console.log('Saving items:', myItems); // Debug log
    }
  }, [myItems]);

  const handleNavigate = (path) => {
    // Always pass isSharedOrder as true since we're in shared cart
    localStorage.setItem('isSharedOrder', 'true');
    navigate(path, {
      state: { isSharedOrder: true }
    });
  };

  const handleStartShopping = () => {
    // Ensure shared order state is preserved when navigating to categories
    localStorage.setItem('isSharedOrder', 'true');
    navigate('/categories', {
      state: { isSharedOrder: true }
    });
  };

  const handleCloseNotification = () => {
  setShowCheckoutNotification(false);
  setHasSeenCheckoutNotification(true);
  sessionStorage.setItem('checkoutNotificationSeen', 'true');
  
  // Remove Mike's orders after 2 seconds
  setTimeout(() => {
    setSharedOrders(prev => {
      const { Mike, ...othersOrders } = prev;
      return othersOrders;
    });
    // Show the removed notification
    setShowRemovedNotification(true);
    // Hide it after 3 seconds
    setTimeout(() => {
      setShowRemovedNotification(false);
    }, 2000);
  }, 3000);
};

  const handleCheckout = () => {
    const orderData = {
      items: myItems,
      totals: {
        subtotal: totals.myTotal,
        deliveryFee: Math.abs(totals.deliveryFee * (1 - SHARED_DISCOUNT) / 4),
        total: totals.myTotal + Math.abs(totals.deliveryFee * (1 - SHARED_DISCOUNT) / 4)
      },
      isSharedOrder: true,
      sharedOrderDetails: {
        totalParticipants: 4,
        otherParticipants: Object.keys(sharedOrders),
        totalOrderValue: totals.myTotal + 
          Math.abs(totals.deliveryFee * (1 - SHARED_DISCOUNT) / 4) + 
          totals.totalShared + 
          Math.abs((totals.deliveryFee * (1 - SHARED_DISCOUNT) / 4) * 3)
      }
    };
  
    // Store checkout data without clearing cart
  localStorage.setItem('checkoutData', JSON.stringify(orderData));
  
  // Don't clear cart when going to checkout
  // localStorage.removeItem('sharedCartItems');
  
  navigate('/checkout');
};



  // Group shared items by user
  const [sharedOrders, setSharedOrders] = useState({
    'John': [
      {
        id: 'sourdough-bread',
        name: 'Sourdough Bread',
        price: 4.50,
        quantity: 2,
        image: 'https://i0.wp.com/daddioskitchen.com/wp-content/uploads/2022/12/IMG-4832.jpg?fit=3024%2C3024&ssl=1'
      },
      {
        id: 'fresh-eggs',
        name: 'Fresh Eggs',
        price: 3.99,
        quantity: 1,
        image: 'https://www.fruitsbox.ae/cdn/shop/products/BrownEggs30_528x.jpg?v=1613217638'
      }
    ],
    'Sarah': [
      {
        id: 'vanilla-cupcakes',
        name: 'Vanilla Cupcakes',
        price: 2.50,
        quantity: 6,
        image: 'https://www.curlyscooking.co.uk/wp-content/uploads/2014/03/Vanilla-Cupcakes-G-scaled.jpg'
      },
      {
        id: 'fresh-berries',
        name: 'Strawberry',
        price: 2.50,
        quantity: 2,
        image: 'https://pngimg.com/d/strawberry_PNG2598.png'
      }
    ],
    'Mike': [
      {
        id: 'fresh-bagels',
        name: 'Fresh Bagels',
        price: 2.20,
        quantity: 4,
        image: 'https://pngimg.com/d/bagel_PNG72.png'
      },
      {
        id: 'cream-cheese',
        name: 'Cream Cheese',
        price: 3.49,
        quantity: 1,
        image: 'https://cdn.puckarabia.com/494b1e/globalassets/new-products-pictures/packshots/resized/11-puck-cream-500g-en.png?width=500&height=500&mode=crop&format=webp'
      }
    ]
  });

  // Calculate total cart count including both user items and shared orders
  const [cartCount, setCartCount] = useState(() => {
    const dummyCount = Object.values(sharedOrders).flat().reduce((sum, item) => sum + item.quantity, 0);
    const savedItems = JSON.parse(localStorage.getItem('sharedCartItems') || '[]');
    const myItemsCount = savedItems.reduce((sum, item) => sum + item.quantity, 0);
    return dummyCount + myItemsCount;
  });


  const updateQuantity = (itemType, itemId, change) => {
    if (itemType === 'my') {
      setMyItems(prevItems => {
        const updatedItems = prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        ).filter(item => item.quantity > 0);
        
        // Update cart count
        const dummyItemsCount = Object.values(sharedOrders).flat().reduce((sum, item) => sum + item.quantity, 0);
        const myItemsCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(dummyItemsCount + myItemsCount);

        // Save to localStorage
      localStorage.setItem('sharedCartItems', JSON.stringify(updatedItems));
      
        
        return updatedItems;
      });
    }
  };

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

      // Update cart count
      const dummyItemsCount = Object.values(sharedOrders).flat().reduce((sum, item) => sum + item.quantity, 0);
      const myItemsCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(dummyItemsCount + myItemsCount);

      // Save to localStorage
    localStorage.setItem('sharedCartItems', JSON.stringify(updatedItems));


      return updatedItems;
    });
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

{showCheckoutNotification && !hasSeenCheckoutNotification && isSharedOrder && (
  <div className="notification-overlay">
    <div className="notification-content">
      <div className="notification-header">
        <h2>Important Notice! ⚠️</h2>
      </div>
      <div className="notification-body">
        <p>You're part of a shared order! Please note that if any participant checks out,
          other participants will have 10 minutes to complete their checkout before their items
          are removed from the cart.</p>
        <div className="timer-indicator">
          ⏰ 10-minute checkout window
        </div>
      </div>
      <button 
        className="notification-button"
        onClick={handleCloseNotification}
      >
        I Understand
      </button>
    </div>
  </div>
)}
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

  .notification-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.notification-content {
  background: white;
  padding: 25px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.notification-header h2 {
  color: #3498db;
  margin: 0 0 15px 0;
  font-size: 1.5rem;
}

.notification-body {
  color: #2c3e50;
  margin-bottom: 20px;
}

.notification-body p {
  margin-bottom: 15px;
  font-size: 1.1rem;
  line-height: 1.5;
}

.timer-indicator {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
  margin: 15px 0;
  font-weight: bold;
}

.notification-button {
  background-color: #3498db;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.notification-button:hover {
  background-color: #2980b9;
}

.removed-notification {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 1000;
  transition: opacity 0.3s ease;
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
        {isSharedOrder && (
          <div style={{ 
            backgroundColor: '#2ecc71', 
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            marginTop: '4px',
            fontSize: '14px'
          }}>
            Shared Order Active with 4 participants
          </div>
        )}
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
    <span>Delivery Fee</span>
    <span style={{ textDecoration: 'line-through' }}>£{totals.deliveryFee.toFixed(2)}</span>
  </div>
  <div className="delivery-savings">
    <span>Discounted delivery fee (75% off)</span>
    <span>£{Math.abs(totals.deliveryFee * (1 - SHARED_DISCOUNT) / 4).toFixed(2)}</span>
  </div>
  <div className="summary-divider"></div>
  <div className="summary-row total-row">
    <span>My Total to Pay</span>
    <span>£{(totals.myTotal + Math.abs(totals.deliveryFee * (1 - SHARED_DISCOUNT) / 4)).toFixed(2)}</span>
  </div>

  <div style={{ marginTop: '20px', color: '#666' }}>
    <div className="summary-row" style={{ fontSize: '14px' }}>
      <span>Other Participants</span>
    </div>
    <div className="summary-row">
      <span>Shared Items Total</span>
      <span>£{(totals.totalShared).toFixed(2)}</span>
    </div>
    <div className="summary-row">
      <span>Their Delivery Fee (3 people)</span>
      <span>£{Math.abs((totals.deliveryFee * (1 - SHARED_DISCOUNT) / 4) * 3).toFixed(2)}</span>
    </div>
    <div className="summary-row">
      <span>Total Order Value</span>
      <span>£{(
        totals.myTotal + 
        Math.abs(totals.deliveryFee * (1 - SHARED_DISCOUNT) / 4) + 
        totals.totalShared + 
        Math.abs((totals.deliveryFee * (1 - SHARED_DISCOUNT) / 4) * 3)
      ).toFixed(2)}</span>
    </div>
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
  Continue to checkout (£{(totals.myTotal + Math.abs(totals.deliveryFee * (1 - SHARED_DISCOUNT) / 4)).toFixed(2)}) →
</button>
</div>
</div>

{showRemovedNotification && (
    <div className="removed-notification">
      Mike's items removed
    </div>
  )}


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
