//HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllCategories } from './productsData';
import bannerImage from '../images/promotion banner.png';
import Logo from '../images/logo.jpeg';


const DUMMY_SHARED_ORDERS = [
  {
    name: "John Smith",
    room: "201",
    items: [
      { name: "Sourdough Bread", quantity: 2, price: 4.50 },
      { name: "Fresh Eggs", quantity: 1, price: 3.99}
    ]
  },
  {
    name: "Sarah Johnson",
    room: "203",
    items: [
      { name: "Vanilla Cupcakes", quantity: 6, price: 2.50 },
      { name: "Strawberry", quantity: 2, price: 2.50 }
    ]
  },
  {
    name: "Mike Chen",
    room: "205",
    items: [
      { name: "Fresh Bagels", quantity: 4, price: 2.20},
      { name: "Cream Cheese", quantity: 1, price: 3.49}
    ]
  }
];

function HomePage() {
  const [cartCount, setCartCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSharedOrder, setIsSharedOrder] = useState(false);
  const [showInitialPopup, setShowInitialPopup] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const handleSwitchToIndividual = () => {
    if (isSharedOrder) {
      setShowSwitchModal(true);
    }
  };
  
  const confirmSwitchToIndividual = () => {
    // Save current shared cart items before switching
    const currentSharedItems = JSON.parse(localStorage.getItem('sharedCartItems') || '[]');
    localStorage.setItem('savedSharedCartItems', JSON.stringify(currentSharedItems));
    
    // Switch to individual order
    setIsSharedOrder(false);
    localStorage.setItem('isSharedOrder', 'false');
    
    // Load individual cart items if they exist
    const individualItems = JSON.parse(localStorage.getItem('individualCartItems') || '[]');
    setCartCount(individualItems.reduce((sum, item) => sum + item.quantity, 0));
    
    setShowSwitchModal(false);
  };
  


// Updated initialization useEffect
useEffect(() => {
  const isPageRefresh = !sessionStorage.getItem('app_initialized');
  
  if (isPageRefresh) {
    // Clear localStorage only on fresh page load/reload
    localStorage.removeItem('sharedCartItems');
    localStorage.removeItem('individualCartItems');
    localStorage.removeItem('isSharedOrder');
    localStorage.removeItem('hasSeenPopup');
    sessionStorage.setItem('app_initialized', 'true');
    setCartCount(0);
    setIsSharedOrder(false);
    setShowInitialPopup(true);
  } else {
    // On normal navigation, check both location state and localStorage
    const savedIsShared = localStorage.getItem('isSharedOrder') === 'true';
    const isSharedFromLocation = location.state?.isSharedOrder;
    
    if (savedIsShared || isSharedFromLocation) {
      setIsSharedOrder(true);
      localStorage.setItem('isSharedOrder', 'true');
      
      // Calculate total items including dummy orders
      const dummyItemsCount = DUMMY_SHARED_ORDERS.reduce((total, person) => {
        return total + person.items.reduce((sum, item) => sum + item.quantity, 0);
      }, 0);
      
      // Add user items from shared cart
      const userItems = JSON.parse(localStorage.getItem('sharedCartItems') || '[]');
      const userItemsCount = userItems.reduce((sum, item) => sum + item.quantity, 0);
      
      setCartCount(dummyItemsCount + userItemsCount);
    } else {
      const individualItems = JSON.parse(localStorage.getItem('individualCartItems') || '[]');
      setCartCount(individualItems.reduce((sum, item) => sum + item.quantity, 0));
    }
  }
}, [location.state]);


useEffect(() => {
  localStorage.setItem('isSharedOrder', isSharedOrder);
}, [isSharedOrder]);

 useEffect(() => {
    if (isSharedOrder) {
      // Calculate total items from dummy orders
      const dummyItemsCount = DUMMY_SHARED_ORDERS.reduce((total, person) => {
        return total + person.items.reduce((sum, item) => sum + item.quantity, 0);
      }, 0);
      setCartCount(dummyItemsCount);
    } else {
      setCartCount(0);
    }
  }, [isSharedOrder]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSharedOrderClick = () => {
    if (!isSharedOrder) {
      setShowModal(true);
      const dummyItemsCount = DUMMY_SHARED_ORDERS.reduce((total, person) => {
        return total + person.items.reduce((sum, item) => sum + item.quantity, 0);
      }, 0);
      setCartCount(dummyItemsCount);
    } else {
      handleSwitchToIndividual();
    }
  };



  const handleCategoryClick = (categoryId) => {
    const isShared = localStorage.getItem('isSharedOrder') === 'true';
    navigate(`/category/${categoryId}`, { 
      state: { isSharedOrder: isShared }
    });
  };
  
  
  
  const handleJoinSharedOrder = () => {
    setIsSharedOrder(true);
    localStorage.setItem('isSharedOrder', 'true');
    setShowModal(false);
    setShowInitialPopup(false);
    
    // Calculate initial cart count
    const dummyItemsCount = DUMMY_SHARED_ORDERS.reduce((total, person) => {
      return total + person.items.reduce((sum, item) => sum + item.quantity, 0);
    }, 0);
    setCartCount(dummyItemsCount);
  };
 
  const handleCartClick = () => {
    // Always check current shared order state
    const isShared = localStorage.getItem('isSharedOrder') === 'true';
    if (isShared) {
      navigate('/sharedcart', {
        state: { isSharedOrder: true }
      });
    } else {
      navigate('/individualCart');
    }
  };

  const handleNavigate = (path) => {
    // Always check current shared order state
    const isShared = localStorage.getItem('isSharedOrder') === 'true';
    if (isShared) {
      navigate(path, {
        state: { isSharedOrder: true }
      });
    } else {
      navigate(path);
    }
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
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 40px;
            z-index: 100;
          }

          .top-buttons {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            gap: 20px;
          }

          .top-buttons button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .top-buttons button:hover {
            background-color: #2980b9;
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

          .promo-box {
            background-color: #fff;
            width: 100%;
            height: 300px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .promo-box:hover {
            transform: scale(1.02);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }

          .promo-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: 0;
          }

          #categories {
            text-align: center;
            padding: 20px;
            margin-bottom: 80px;
          }

          #categories h2 {
            color: #3498db;
          }

          .category-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            justify-content: center;
            gap: 20px;
            max-width: 1000px;
            margin: 0 auto;
          }

          .category-item {
            text-align: center;
            width: 100%;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 15px;
            transition: transform 0.3s ease;
            cursor: pointer;
          }

          .category-item:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }

          .category-item img {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #3498db;
            transition: border-color 0.3s ease;
          }

          .category-item:hover img {
            border-color: #2980b9;
          }

          .category-item p {
            margin-top: 10px;
            color: #2c3e50;
            font-weight: bold;
            transition: color 0.3s ease;
          }

          .category-item:hover p {
            color: #3498db;
          }

          .loading {
            text-align: center;
            padding: 20px;
            font-size: 1.2rem;
            color: #3498db;
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
            transition: background-color 0.3s;
          }

          .bottom-nav button:hover {
            background-color: #2980b9;
          }

          #cart-btn img {
            max-height: 20px;
            margin-right: 10px;
          }

          /* Modal styles */
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }

          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
          }

          .modal-header {
            margin-bottom: 20px;
          }

          .modal-header h2 {
            color: #3498db;
            margin: 0 0 8px 0;
          }

          .modal-header p {
            color: #666;
            margin: 0;
          }

          .participant-item {
            border: 1px solid #eee;
            border-radius: 4px;
            padding: 10px;
            margin-bottom: 10px;
          }

          .participant-item h3 {
            margin: 0 0 8px 0;
            color: #2c3e50;
          }

          .participant-items p {
            margin: 4px 0;
            color: #666;
          }

          .modal-footer {
            margin-top: 20px;
            display: flex;
            gap: 10px;
            justify-content: flex-end;
          }

          .modal-button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
          }

          .join-button {
            background-color: #2ecc71;
            color: white;
          }

          .join-button:hover {
            background-color: #27ae60;
          }

          .cancel-button {
            background-color: #e74c3c;
            color: white;
          }

          .cancel-button:hover {
            background-color: #c0392b;
          }

          @media (max-width: 768px) {
            .category-container {
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
            .category-container {
              grid-template-columns: repeat(2, 1fr);
            }
          }
     

/* Adding new styles for initial popup */
          .initial-popup-overlay {
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

          .initial-popup {
            background: white;
            padding: 25px;
            border-radius: 10px;
            width: 90%;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .initial-popup h2 {
            color: #3498db;
            margin: 0 0 15px 0;
            font-size: 1.5rem;
          }

          .initial-popup p {
            color: #2c3e50;
            margin-bottom: 20px;
            font-size: 1.1rem;
          }

          .initial-popup-buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
          }

          .initial-popup-button {
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s;
          }

          .join-popup-button {
            background-color: #3498db;
            color: white;
          }

          .join-popup-button:hover {
            background-color: #2980b9;
          }

          .cancel-popup-button {
            background-color: #95a5a6;
            color: white;
          }

          .cancel-popup-button:hover {
            background-color: #7f8c8d;
          }
           `}
     
      </style>


      {showInitialPopup && (
        <div className="initial-popup-overlay">
          <div className="initial-popup">
            <h2>Shared order initiated by John! 🛒</h2>
            <p>Want to join and save 50% on grocery delivery? join now!</p>
            <div className="initial-popup-buttons">
              <button 
                className="initial-popup-button join-popup-button"
                onClick={() => {
                  setShowInitialPopup(false);
                  setShowModal(true);
                }}
              >
                Join Now
              </button>
              <button 
                className="initial-popup-button cancel-popup-button"
                onClick={() => setShowInitialPopup(false)}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

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
      <div className="top-buttons">
  <button 
    id="shared-orders" 
    onClick={handleSharedOrderClick}
    style={{ 
      backgroundColor: isSharedOrder ? '#2ecc71' : '#3498db',
    }}
  >
    {isSharedOrder ? '✓ Shared Order Active' : 'Join Shared Order'}
  </button>
  <button 
    id="individual-orders"
    onClick={() => isSharedOrder ? handleSwitchToIndividual() : null}
    style={{ 
      backgroundColor: !isSharedOrder ? '#2ecc71' : '#3498db',
      cursor: 'pointer'
    }}
  >
    {!isSharedOrder ? '✓ Individual Order Active' : 'Switch to Individual'}
  </button>
</div>
        
        <div className="logo-search-location">
          <div id="logo">
            <img src={Logo} alt="Logo" id="logo-img" />
          </div>
          <div id="search-box">
            <input type="text" placeholder="Search products..." />
          </div>
        </div>
        <div id="location-btn-container">
          <span id="location-text">Deliver to:</span>
          <button id="location-btn">SSH Home London, UK</button>
        </div>
      </header>

      {/* Shared Order Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Join Shared Order</h2>
              <p>Current shared order at SSH Home London</p>
            </div>
            <div className="modal-body">
              {DUMMY_SHARED_ORDERS.map((participant, index) => (
                <div key={index} className="participant-item">
                  <h3>{participant.name} (Room {participant.room})</h3>
                  <div className="participant-items">
                    {participant.items.map((item, itemIndex) => (
                      <p key={itemIndex}>
                        • {item.name} x{item.quantity} - £{(item.price * item.quantity).toFixed(2)}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              <p style={{ marginTop: '15px', color: '#3498db' }}>
                Join now to share delivery costs with your housemates!
              </p>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-button join-button"
                onClick={handleJoinSharedOrder}
              >
                Join Shared Order
              </button>
              <button 
                className="modal-button cancel-button"
                onClick={() => setShowModal(false)}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

{showSwitchModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h2>Switch to Individual Order?</h2>
        <p>Your shared cart items will be saved for later</p>
      </div>
      <div className="modal-body">
        <p>You can always rejoin the shared order later.</p>
        <p>Your individual cart items will be restored.</p>
      </div>
      <div className="modal-footer">
        <button 
          className="modal-button join-button"
          onClick={confirmSwitchToIndividual}
        >
          Switch to Individual
        </button>
        <button 
          className="modal-button cancel-button"
          onClick={() => setShowSwitchModal(false)}
        >
          Stay in Shared Order
        </button>
      </div>
    </div>
  </div>
)}

<section 
  className="promo-box" 
  onClick={() => handleNavigate('/promotions')}  
>
        <img 
          src={bannerImage}
          alt="20% Off on Selected Items" 
        />
      </section>

      <section id="categories">
        <h2>Categories</h2>
        {loading ? (
          <div className="loading">Loading categories...</div>
        ) : (
          <div className="category-container">
            {categories.map(category => (
              <div 
                key={category.id} 
                className="category-item" 
                onClick={() => handleCategoryClick(category.id)}
              >
                <img src={category.image} alt={category.name} />
                <p>{category.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="bottom-nav">
        <button onClick={() => handleNavigate('/categories')}>Categories</button>
        <button onClick={() => handleNavigate('/')}>Home</button>
        <button id="cart-btn" onClick={handleCartClick}> 
          <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Cart" />
          Cart ({cartCount}) {isSharedOrder && '(Shared)'}
        </button>
      </div>
    </>
  );
}

export default HomePage;
